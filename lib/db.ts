import { Pool } from 'pg';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./generated/prisma/client";

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
    pgPool: Pool | undefined;
};

function createPrismaClient() {
    let url = process.env.DATABASE_URL;
    if (!url) {
        throw new Error('DATABASE_URL is not set');
    }

    // Replace deprecated sslmode aliases (require, prefer, verify-ca) with verify-full to suppress pg-connection-string warning
    url = url.replace(/sslmode=(require|prefer|verify-ca)/, 'sslmode=verify-full');

    const pool = new Pool({
        connectionString: url,
        max: 10, // pool up to 10 connections
        idleTimeoutMillis: 30000, // close idle clients after 30 seconds
        connectionTimeoutMillis: 2000, // wait up to 2 seconds for a connection
    });

    const adapter = new PrismaPg(pool);

    if (process.env.NODE_ENV !== "production") {
        globalForPrisma.pgPool = pool;
    }

    return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}