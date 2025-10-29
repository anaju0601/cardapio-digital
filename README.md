# University Management System

A full-stack application for managing university professors, subjects, and schedules.

## Features

- **Authentication**: JWT-based authentication with login and registration
- **Professors Management**: Create, read, update, and delete professor records
- **Subjects Management**: Manage subjects with professor assignments
- **Schedules Management**: Create and manage class schedules
- **API Documentation**: Interactive Swagger documentation
- **Responsive UI**: Modern, mobile-friendly interface

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui components
- SWR for data fetching

### Backend
- Node.js with Express
- TypeORM
- PostgreSQL
- JWT authentication
- Swagger documentation

### DevOps
- Docker & Docker Compose
- GitHub Actions CI/CD
- Vercel (Frontend)
- Docker Hub (Backend)

## Getting Started

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- PostgreSQL (or use Docker)

### Installation

1. Clone the repository:
\`\`\`bash
git clone <your-repo-url>
cd university-management-system
\`\`\`

2. Install frontend dependencies:
\`\`\`bash
npm install
\`\`\`

3. Install backend dependencies:
\`\`\`bash
cd api
npm install
\`\`\`

4. Set up environment variables:

Frontend `.env.local`:
\`\`\`env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
\`\`\`

Backend `api/.env`:
\`\`\`env
PORT=3001
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/university
JWT_SECRET=your-secret-key-here
NODE_ENV=development
\`\`\`

5. Start the database:
\`\`\`bash
cd api
docker-compose up -d db
\`\`\`

6. Start the backend:
\`\`\`bash
cd api
npm run dev
\`\`\`

7. Start the frontend:
\`\`\`bash
npm run dev
\`\`\`

8. Open your browser:
- Frontend: http://localhost:3000
- API: http://localhost:3001
- API Docs: http://localhost:3001/api-docs

## Project Structure

\`\`\`
.
├── app/                    # Next.js app directory
│   ├── dashboard/         # Dashboard pages
│   ├── login/            # Login page
│   └── register/         # Register page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                   # Utilities and API client
├── api/                   # Backend API
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── entities/     # TypeORM entities
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Express middleware
│   │   └── config/       # Configuration files
│   ├── Dockerfile        # Docker configuration
│   └── docker-compose.yml
├── .github/
│   └── workflows/        # GitHub Actions workflows
└── docs/                 # Documentation
\`\`\`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Professors
- `GET /api/professors` - List all professors
- `GET /api/professors/:id` - Get professor by ID
- `POST /api/professors` - Create professor
- `PUT /api/professors/:id` - Update professor
- `DELETE /api/professors/:id` - Delete professor

### Subjects
- `GET /api/subjects` - List all subjects
- `GET /api/subjects/:id` - Get subject by ID
- `POST /api/subjects` - Create subject
- `PUT /api/subjects/:id` - Update subject
- `DELETE /api/subjects/:id` - Delete subject

### Schedules
- `GET /api/schedules` - List all schedules
- `GET /api/schedules/:id` - Get schedule by ID
- `POST /api/schedules` - Create schedule
- `PUT /api/schedules/:id` - Update schedule
- `DELETE /api/schedules/:id` - Delete schedule

## Deployment

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

1. Push to main branch - triggers automatic deployment
2. Frontend deploys to Vercel
3. Backend deploys via Docker to production server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details
