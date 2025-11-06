# Guia Docker - Cardápio Digital

## Pré-requisitos

- Docker instalado (versão 20.10 ou superior)
- Docker Compose instalado (versão 2.0 ou superior)

## Estrutura dos Containers

O projeto utiliza 3 containers principais:

1. **postgres** - Banco de dados PostgreSQL 16
2. **backend** - API REST em TypeScript com Express e TypeORM
3. **frontend** - Aplicação Next.js

## Comandos Rápidos

### Desenvolvimento

# Ou usando docker-compose diretamente
docker-compose -f docker-compose.dev.yml up --build
\`\`\`

### Produção

\`\`\`bash
# Apaga tudo anteriormente
docker compose down --volumes --remove-orphans    

# Docker-compose para build
docker compose build --no-cache 

# Sobe o docker 
docker compose build --no-cache 
\`\`\`

### Outros Comandos

\`\`\`bash
# Parar containers
make down

# Ver logs
make logs

# Limpar tudo (containers, volumes, imagens)
make clean
\`\`\`

## Portas Utilizadas

- **3000** - Frontend (Next.js)
- **3001** - Backend (API)
- **5432** - PostgreSQL

## Acessando os Serviços

Após iniciar os containers:

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Swagger Docs: http://localhost:3001/api-docs
- PostgreSQL: localhost:5432

## Variáveis de Ambiente

### Backend

- `NODE_ENV` - Ambiente (development/production)
- `PORT` - Porta do servidor (padrão: 3001)
- `DB_HOST` - Host do banco de dados
- `DB_PORT` - Porta do banco de dados
- `DB_USER` - Usuário do banco
- `DB_PASSWORD` - Senha do banco
- `DB_NAME` - Nome do banco
- `JWT_SECRET` - Chave secreta para JWT

### Frontend

- `NEXT_PUBLIC_API_URL` - URL da API backend

## Volumes

- `postgres_data` - Persiste dados do PostgreSQL em produção
- `postgres_data_dev` - Persiste dados do PostgreSQL em desenvolvimento

## Networks

- `cardapio-network` - Rede para comunicação entre containers em produção
- `cardapio-network-dev` - Rede para comunicação entre containers em desenvolvimento

## Troubleshooting

### Erro de conexão com banco de dados

Aguarde alguns segundos após iniciar os containers. O backend espera o PostgreSQL estar pronto através do healthcheck.

### Porta já em uso

Se alguma porta estiver em uso, você pode modificar no `docker-compose.yml`:

\`\`\`yaml
ports:
  - "NOVA_PORTA:PORTA_INTERNA"
\`\`\`

### Limpar e reconstruir

\`\`\`bash
make clean
make build
make up
\`\`\`

## Desenvolvimento Local

Para desenvolvimento local sem Docker:

1. Instale PostgreSQL localmente
2. Configure as variáveis de ambiente em `.env`
3. Execute:

\`\`\`bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
