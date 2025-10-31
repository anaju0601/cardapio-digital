# --- ESTÁGIO 1: Build ---
FROM node:20-alpine AS base
WORKDIR /app
# Instala pnpm
RUN npm install -g pnpm
COPY package*.json ./

FROM base AS development
# Instala todas as dependências (para dev, se necessário)
RUN pnpm install
COPY . .
EXPOSE 3001
CMD ["pnpm", "run", "dev"]

FROM base AS builder
# Instala dependências (para build)
RUN pnpm install
COPY . .
# Roda o script de build
RUN pnpm run build

# --- ESTÁGIO 2: Produção ---
FROM node:20-alpine AS production
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
# Instala SÓ dependências de produção
RUN npm install -g pnpm && pnpm install --prod
# Copia o código 'buildado' do estágio builder
COPY --from=builder /app/dist ./dist
EXPOSE 3001
# Roda o app em produção
CMD ["node", "dist/server.js"]