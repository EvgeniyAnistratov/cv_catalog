# CV catalog

## Description

This project is a backend service built with NestJS and TypeScript, following Clean Architecture principles.

## Architecture

The project is built with the following technologies:

- Node.js
- NestJS
- TypeScript
- Prisma
- GraphQL
- PostgreSQL
- Docker

## Project structure

```
cv_catalog/
├── prisma/                        # Database schema and seeding configuration, SQL migration files
├── docs/                          # Documentation files
├── src/                           # Main application source code
│   ├── domain/                    # Domain layer (core business logic and rules)
│   │   ├── entities/              # Domain entities
│   │   └── repositories/          # Repository interfaces
│   ├── application/               # Application layer
│   │   ├── dto/                   # Data Transfer Objects for input and output objects
│   │   └── use-cases/             # Orchestrators for specific business actions
│   ├── infra/                     # Infrastructure layer (external tools and frameworks)
│   │   ├── config/                # Zod schema, env variables validation, interfaces for grouping variables
│   │   ├── db/                    # Prisma generated code and Prisma setup
│   │   └── repositories/          # Implementation of domain repository interfaces
│   └── presentation/              # Presentation layer
│       ├── graphql/               # GraphQL API layer components
│       │   ├── data-loaders/      # @strv/nestjs-dataloader data loaders to solve N+1 query problems
│       │   ├── resolvers/         # GraphQL resolvers
│       │   └── schemas/           # GraphQL type definitions and schema files
│       └── modules/               # NestJS modules
└── README.md
```

## Running the Project

### Using Docker

1. Configure environment variables: [Environment Variables](docs/environments.md). Use `.env` file because `docker-compose.yaml` relies on it.
2. Build and run the application:

```bash
# Create the .env file
cp .env.example .env
# Build and run docker containers
docker-compose up --build
```

### Local Development

```bash
$ npm install
```

### Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
