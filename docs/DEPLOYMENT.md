# Deployment Guide

This guide covers deploying the University Management System to production.

## Prerequisites

- Docker and Docker Compose installed
- GitHub account with repository access
- Vercel account for frontend deployment
- Production server with SSH access (for backend)
- Docker Hub account

## Required Secrets

Configure these secrets in your GitHub repository settings:

### Frontend (Vercel)
- `VERCEL_TOKEN` - Your Vercel authentication token
- `VERCEL_ORG_ID` - Your Vercel organization ID
- `VERCEL_PROJECT_ID` - Your Vercel project ID
- `NEXT_PUBLIC_API_URL` - Production API URL

### Backend (Docker)
- `DOCKER_USERNAME` - Docker Hub username
- `DOCKER_PASSWORD` - Docker Hub password or access token

### Server Deployment
- `SERVER_HOST` - Production server IP or hostname
- `SERVER_USERNAME` - SSH username
- `SERVER_SSH_KEY` - Private SSH key for server access

### Database
- `DATABASE_URL` - PostgreSQL connection string
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT tokens

## Deployment Steps

### 1. Frontend Deployment (Vercel)

The frontend automatically deploys to Vercel on push to main branch.

Manual deployment:
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### 2. Backend Deployment (Docker)

The backend is containerized and deployed via Docker Compose.

On your production server:

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd university-management-system

# Create environment file
cp .env.example .env
# Edit .env with your production values

# Start services
cd api
docker-compose up -d

# Check logs
docker-compose logs -f
\`\`\`

### 3. Database Setup

The database runs in a Docker container. Initial setup:

\`\`\`bash
# Access the database container
docker exec -it university-db psql -U <DB_USER> -d <DB_NAME>

# Run migrations (if needed)
# Tables are auto-created by TypeORM on first run
\`\`\`

## CI/CD Pipeline

The GitHub Actions pipeline automatically:

1. **On Pull Request:**
   - Runs linting
   - Builds frontend and backend
   - Runs tests
   - Generates coverage reports

2. **On Push to Main:**
   - All PR checks
   - Builds Docker images
   - Pushes to Docker Hub
   - Deploys frontend to Vercel
   - Deploys backend to production server

## Monitoring

### Health Checks

- Frontend: `https://your-domain.vercel.app`
- Backend: `https://api.your-domain.com/health`
- API Docs: `https://api.your-domain.com/api-docs`

### Logs

\`\`\`bash
# Frontend logs (Vercel Dashboard)
# Visit: https://vercel.com/dashboard

# Backend logs
docker-compose logs -f api

# Database logs
docker-compose logs -f db
\`\`\`

## Rollback

If deployment fails:

\`\`\`bash
# Rollback to previous version
docker-compose down
docker pull <DOCKER_USERNAME>/university-api:<previous-sha>
docker-compose up -d
\`\`\`

## Scaling

### Horizontal Scaling

Add more API instances behind a load balancer:

\`\`\`yaml
# docker-compose.yml
services:
  api:
    deploy:
      replicas: 3
\`\`\`

### Database Scaling

Consider managed PostgreSQL services:
- AWS RDS
- Google Cloud SQL
- Supabase
- Neon

## Security Checklist

- [ ] All secrets configured in GitHub
- [ ] Environment variables set on production server
- [ ] Database credentials rotated
- [ ] JWT secret is strong and unique
- [ ] CORS configured for production domains
- [ ] HTTPS enabled (use Nginx/Caddy as reverse proxy)
- [ ] Firewall rules configured
- [ ] Regular backups scheduled

## Troubleshooting

### Frontend Issues
- Check Vercel deployment logs
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check browser console for errors

### Backend Issues
- Check Docker logs: `docker-compose logs api`
- Verify database connection
- Check environment variables
- Ensure port 3001 is accessible

### Database Issues
- Check PostgreSQL logs: `docker-compose logs db`
- Verify connection string
- Check disk space
- Verify credentials
