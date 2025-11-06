# --- Base ---
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm
COPY package*.json ./
COPY pnpm-lock.yaml ./

# --- Development (opcional para rodar local) ---
FROM base AS development
RUN pnpm install
COPY . .
EXPOSE 3001
CMD ["pnpm", "run", "dev"]

# --- Builder (compila TypeScript) ---
FROM base AS builder
# Desativa telemetria e configura pnpm
ENV SCARF_ANALYTICS=false
RUN pnpm config set prefer-frozen-lockfile false
RUN pnpm config set enable-pre-post-scripts true

# Instala tudo (incluindo devDependencies)
RUN pnpm install
COPY . .

# Compila o TypeScript
RUN pnpm run build

# --- Production (imagem leve e otimizada) ---
FROM node:20-alpine AS production
WORKDIR /app

# Instala apenas dependências necessárias em produção
RUN npm install -g pnpm
COPY package*.json ./
COPY pnpm-lock.yaml ./
RUN pnpm install --prod

# Copia o código compilado da fase de build
COPY --from=builder /app/dist ./dist

# Expõe a porta da API
EXPOSE 3001

# Inicia o servidor
CMD ["node", "dist/server.js"]
