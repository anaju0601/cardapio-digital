FROM node:20-alpine AS base
WORKDIR /app

RUN npm install -g pnpm
COPY package*.json ./

FROM base AS development
# Este é o estágio que o 'target' vai usar
RUN pnpm install
COPY . .
EXPOSE 3001
CMD ["pnpm", "run", "dev"]

FROM base AS builder
RUN pnpm install
COPY . .
RUN pnpm run build

FROM node:20-alpine AS production
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --prod
COPY --from=builder /app/dist ./dist
EXPOSE 3001
CMD ["node", "dist/server.js"]