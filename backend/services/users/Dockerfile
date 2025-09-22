FROM node:22-alpine

RUN corepack enable

WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./

COPY services/users/package.json services/users/tsconfig.json ./services/users/

RUN pnpm -r --filter ./services/users... install --frozen-lockfile

COPY services/users ./services/users

RUN cd services/users && pnpm prisma generate

RUN cd services/users && pnpm build

WORKDIR /app/services/users

CMD ["node", "dist/server.js"]
