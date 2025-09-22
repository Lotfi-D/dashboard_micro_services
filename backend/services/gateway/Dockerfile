FROM node:22-alpine

RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

COPY services/gateway/package.json services/gateway/tsconfig.json ./services/gateway/

RUN pnpm -r --filter ./services/gateway... install --no-frozen-lockfile


COPY services/gateway ./services/gateway

RUN cd services/gateway && pnpm build

WORKDIR /app/services/gateway

CMD ["node", "dist/server.js"]
