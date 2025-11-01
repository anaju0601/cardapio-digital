
FROM node:20-alpine


RUN npm install -g pnpm


WORKDIR /app


COPY frontend/package.json ./


RUN pnpm install


CMD ["pnpm", "run", "dev"]
