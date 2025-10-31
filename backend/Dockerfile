# Imagem base
FROM node:20-alpine

# Instala o pnpm globalmente
RUN npm install -g pnpm

# Define o diretório de trabalho
WORKDIR /app

# Copia SÓ os arquivos de dependência
COPY package.json pnpm-lock.yaml ./

# Instala as dependências (ESTE É O PASSO QUE FALTAVA)
# Isso vai instalar o ts-node-dev e tudo mais
RUN pnpm install

# O docker-compose vai rodar o comando, mas é bom ter um padrão
CMD ["pnpm", "run", "dev"]
