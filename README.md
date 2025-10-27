# Cardápio Digital - API REST com TypeScript

Sistema completo de gerenciamento de cardápio digital com backend API REST, frontend Next.js, autenticação JWT, documentação Swagger e deploy automatizado.

## Tecnologias Utilizadas

### Backend
- TypeScript
- Node.js + Express
- TypeORM
- PostgreSQL
- JWT (autenticação)
- Swagger (documentação)
- Bcrypt (hash de senhas)

### Frontend
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui

### DevOps
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- PostgreSQL em container

## Requisitos

- Node.js 20+
- Docker e Docker Compose
- PostgreSQL (se rodar sem Docker)

## Instalação e Execução

### Com Docker (Recomendado)

\`\`\`bash
# Desenvolvimento
make dev

# Produção
make prod

# Ver logs
make logs

# Parar containers
make down
\`\`\`

### Sem Docker

#### Backend

\`\`\`bash
cd backend
npm install
cp .env.example .env
# Configure as variáveis de ambiente
npm run dev
\`\`\`

#### Frontend

\`\`\`bash
cd frontend
npm install
cp .env.local.example .env.local
# Configure NEXT_PUBLIC_API_URL
npm run dev
\`\`\`

## Estrutura do Projeto

\`\`\`
.
├── backend/                 # API REST
│   ├── src/
│   │   ├── config/         # Configurações (DB, Swagger)
│   │   ├── controllers/    # Controllers
│   │   ├── entities/       # Entidades TypeORM
│   │   ├── middleware/     # Middlewares (auth, error)
│   │   ├── routes/         # Rotas da API
│   │   └── server.ts       # Servidor Express
│   ├── Dockerfile
│   └── package.json
│
├── frontend/               # Next.js App
│   ├── app/               # Pages (App Router)
│   ├── components/        # Componentes React
│   ├── lib/              # Utilitários (API client)
│   ├── Dockerfile
│   └── package.json
│
├── .github/
│   └── workflows/         # GitHub Actions
│       ├── ci.yml        # Integração Contínua
│       ├── cd.yml        # Entrega Contínua
│       └── test.yml      # Testes
│
├── docker-compose.yml     # Produção
├── docker-compose.dev.yml # Desenvolvimento
└── Makefile              # Comandos úteis
\`\`\`

## Endpoints da API

### Autenticação

- `POST /api/auth/register` - Registrar usuário
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Perfil (requer token)

### Produtos

- `GET /api/products` - Listar produtos
- `GET /api/products/:id` - Buscar produto
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Deletar produto

### Categorias

- `GET /api/categories` - Listar categorias
- `GET /api/categories/:id` - Buscar categoria
- `POST /api/categories` - Criar categoria
- `PUT /api/categories/:id` - Atualizar categoria
- `DELETE /api/categories/:id` - Deletar categoria

## Documentação

- **Swagger UI:** http://localhost:3001/api-docs
- **Health Check:** http://localhost:3001/health

## Autenticação

Todas as rotas (exceto registro e login) requerem autenticação JWT.

\`\`\`bash
# Exemplo de requisição autenticada
curl -H "Authorization: Bearer SEU_TOKEN" http://localhost:3001/api/products
\`\`\`

## CI/CD

O projeto utiliza GitHub Actions para:

- Testes automatizados
- Build de imagens Docker
- Deploy automático
- Publicação no Docker Hub

Veja [CI_CD.md](CI_CD.md) para mais detalhes.

## Variáveis de Ambiente

### Backend (.env)

\`\`\`env
PORT=3001
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=cardapio_db
JWT_SECRET=your-secret-key
\`\`\`

### Frontend (.env.local)

\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001
\`\`\`

## Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

MIT

## Autores

Projeto desenvolvido para trabalho acadêmico sobre APIs REST com TypeScript.
