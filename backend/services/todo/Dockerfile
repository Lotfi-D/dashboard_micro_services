FROM node:22-alpine
WORKDIR /app
RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

COPY services/todo/package.json services/todo/tsconfig.json ./services/todo/

RUN pnpm -r --filter ./services/todo... install --frozen-lockfile

COPY services/todo ./services/todo

RUN pnpm -r --filter ./services/todo... build

WORKDIR /app/services/todo
CMD ["node", "dist/server.js"]
