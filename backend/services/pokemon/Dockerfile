FROM node:22-alpine
WORKDIR /app
RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY services/pokemon/package.json services/pokemon/tsconfig.json ./services/pokemon/
RUN pnpm -r --filter ./services/pokemon... install --frozen-lockfile

COPY services/pokemon ./services/pokemon
RUN pnpm -r --filter ./services/pokemon... build

WORKDIR /app/services/pokemon
CMD ["node", "dist/server.js"]
