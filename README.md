# ChaiGPT

A full-stack ChatGPT-style AI chat application built with Next.js, React, the Vercel AI SDK, OpenAI, Clerk, Prisma, and PostgreSQL.

ChaiGPT is a learning-focused project for building a modern AI chat experience with authentication, persistent conversations, streaming responses, web search, and a structured Next.js application architecture.

## Features

- **AI conversations** with streaming responses
- **Persistent chat history** stored in PostgreSQL through Prisma
- **Authentication and protected routes** with Clerk
- **Web search tool** powered by Tavily for current and external information
- **Tool calling** through the Vercel AI SDK
- **Conversation ownership** so users can access their own chats
- **API rate limiting** with a backend-enforced request limit
- **Message persistence** during and after streaming responses
- **Markdown, code, math, Mermaid, and CJK streaming support** through Streamdown packages
- **Modern UI** built with React, Tailwind CSS, shadcn/ui, and Lucide icons
- **Type-safe development** with TypeScript, Zod, and Prisma

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| UI | React 19, Tailwind CSS, shadcn/ui |
| AI | Vercel AI SDK, OpenAI |
| Authentication | Clerk |
| Database | PostgreSQL |
| ORM | Prisma |
| Web Search | Tavily |
| Data Fetching | TanStack Query |
| Animations | Framer Motion |
| Validation | Zod |
| Package Manager | Bun |

## Architecture

```text
User
  │
  ▼
Next.js App Router
  │
  ├── Clerk Authentication
  │
  ├── Chat UI
  │     │
  │     ▼
  │   /api/chat
  │     │
  │     ├── Validate request
  │     ├── Verify user & conversation
  │     ├── Load previous messages
  │     ├── Vercel AI SDK
  │     │      ├── LLM response
  │     │      └── Tavily web search tool
  │     └── Stream response to client
  │
  └── Prisma
         │
         ▼
     PostgreSQL
```

## Project Structure

```text
ChaiGPT/
├── app/                 # Next.js App Router routes and layouts
│   ├── (auth)/          # Authentication routes
│   ├── (root)/          # Protected application routes
│   └── api/             # API routes, including the chat endpoint
├── components/          # Shared UI components
├── features/            # Feature-specific application logic
│   ├── ai/              # AI, streaming, tools, and chat persistence
│   ├── auth/            # Authentication and onboarding
│   └── conversation/    # Conversation-related functionality
├── hooks/               # React hooks
├── lib/                 # Shared utilities, database, cache, and logging
├── prisma/              # Prisma schema and database configuration
├── public/              # Static assets
├── components.json      # shadcn configuration
├── next.config.ts       # Next.js configuration
└── package.json         # Scripts and dependencies
```

## Getting Started

### Prerequisites

Make sure you have:

- Node.js 20+
- Bun
- PostgreSQL database
- Clerk application
- OpenAI API key
- Tavily API key

### 1. Clone the repository

```bash
git clone https://github.com/swamiabhishek45/ChaiGPT.git
cd ChaiGPT
```

### 2. Install dependencies

Using Bun:

```bash
bun install
```

You can also use npm, pnpm, or yarn if preferred.

### 3. Configure environment variables

Create a `.env.local` file in the project root and provide the credentials required by the application.

```env
DATABASE_URL="your-postgresql-connection-string"
OPENAI_API_KEY="your-openai-api-key"
TAVILY_API_KEY="your-tavily-api-key"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"
```

> The exact environment variables may evolve as the project changes. Check the source code for any additional variables required by your current configuration.

### 4. Set up the database

Run Prisma migrations or generate the Prisma client according to the current schema:

```bash
bunx prisma generate
bunx prisma migrate dev
```

### 5. Start the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
bun dev       # Start the development server
bun build     # Create a production build
bun start     # Start the production server
bun lint      # Run ESLint
```

## How the AI Chat Works

When a user sends a message, the chat API:

1. Authenticates the request with Clerk.
2. Validates the conversation and verifies ownership.
3. Checks the user's API request limit.
4. Loads the existing conversation history from the database.
5. Sends the messages to the configured AI model through the Vercel AI SDK.
6. Gives the model access to a Tavily-powered web search tool.
7. Streams the generated response back to the client.
8. Saves the resulting messages after the stream completes.

The chat endpoint also limits requests at the backend and returns HTTP `429` when the configured limit is exceeded.

## Security Notes

- Keep API keys and database credentials in environment variables.
- Never commit `.env` or `.env.local` files.
- Chat requests are authenticated before the AI endpoint is accessed.
- Conversation ownership is checked before messages are loaded or generated.
- Rate limiting is enforced on the server rather than relying only on the client.

## Development

This project follows a feature-oriented structure instead of putting all application logic into a single directory. When adding functionality, prefer keeping UI, actions, utilities, and domain logic close to the feature they belong to.

Before making changes to the Next.js application, also review `AGENTS.md` for project-specific development guidance.

## Roadmap

Potential areas for future development include:

- Better conversation branching and management
- More AI models and model selection
- Improved web search and source presentation
- File and document uploads
- RAG and knowledge-base conversations
- More granular usage limits and subscriptions
- Better observability and AI request analytics
- Production-focused testing and CI/CD

## Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Run linting and build checks.
5. Open a pull request with a clear description of the change.

## License

This project is currently intended as a personal and educational project. If you plan to reuse or distribute it, check the repository for the applicable licensing terms.

## Author

Built by **Abhishek Swami**.

- GitHub: https://github.com/swamiabhishek45
- Repository: https://github.com/swamiabhishek45/ChaiGPT
