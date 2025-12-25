# Deployment Guide

This guide covers containerizing and deploying your application using Docker and GitHub Actions.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Docker Setup](#docker-setup)
3. [Local Development with Docker](#local-development-with-docker)
4. [GitHub Actions CI/CD Setup](#github-actions-cicd-setup)
5. [Server Deployment](#server-deployment)
6. [Environment Variables](#environment-variables)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- Docker and Docker Compose installed on your server
- Git repository on GitHub
- SSH access to your deployment server
- Domain name (optional, for production)

## Docker Setup

### Project Structure

The project includes:
- `client/Dockerfile` - React/Vite frontend container
- `server/Dockerfile` - Node.js/Express backend container
- `docker-compose.yml` - Orchestration for all services
- `.dockerignore` files - Exclude unnecessary files from builds

### Services

1. **db** - MySQL 8.0 database
2. **server** - Backend API (Express/Node.js)
3. **client** - Frontend (React/Vite served by Nginx)

## Local Development with Docker

### 1. Create Environment File

Create a `.env` file in the root directory:

```env
# Database Configuration
DB_ROOT_PASSWORD=your_secure_root_password
DB_USER=bloguser
DB_PASSWORD=your_secure_db_password
DB_NAME=blog
DB_PORT=3306

# Server Configuration
SERVER_PORT=8080
ADMIN_API_KEY=your_secure_random_api_key_here
FRONTEND_URL=http://localhost

# Client Configuration
CLIENT_PORT=80
VITE_API_BASE_URL=http://localhost:8080
```

### 2. Build and Start Containers

```bash
# Build images
docker compose build

# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop services
docker compose down
```

### 3. Initialize Database

The database will be automatically initialized with the `setup_database.sql` script on first run. To manually run migrations:

```bash
docker compose exec db mysql -uroot -p${DB_ROOT_PASSWORD} blog < setup_database.sql
```

### 4. Access the Application

- Frontend: http://localhost
- Backend API: http://localhost:8080
- MySQL: localhost:3306

## GitHub Actions CI/CD Setup

### 1. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

- `SERVER_HOST` - Your server IP or domain (e.g., `123.45.67.89` or `gavinpicard.com`)
- `SERVER_USER` - SSH username (e.g., `deploy` or `root`)
- `SERVER_SSH_KEY` - Your private SSH key (contents of `~/.ssh/id_rsa` or similar)
- `DEPLOY_PATH` - Path on server where code is deployed (e.g., `/opt/gavinpicard`)
- `VITE_API_BASE_URL` - Production API URL (e.g., `https://api.gavinpicard.com`)

### 2. SSH Key Setup on Server

If you don't have SSH key authentication set up:

```bash
# On your local machine, generate SSH key if you don't have one
ssh-keygen -t rsa -b 4096 -C "your_email@example.com"

# Copy public key to server
ssh-copy-id user@your-server-ip

# Test connection
ssh user@your-server-ip
```

### 3. Server Preparation

On your deployment server:

```bash
# Create deployment directory
sudo mkdir -p /opt/gavinpicard
sudo chown $USER:$USER /opt/gavinpicard

# Install Docker and Docker Compose
# Ubuntu/Debian:
sudo apt update
sudo apt install docker.io docker-compose-plugin -y
sudo usermod -aG docker $USER
newgrp docker

# Verify installation
docker --version
docker compose version
```

### 4. Initial Server Setup

```bash
# Clone repository
cd /opt/gavinpicard
git clone https://github.com/your-username/gavinpicard.git .

# Create production environment file
nano .env
# Copy contents from .env.example and update with production values

# Make sure .env is not committed
git update-index --assume-unchanged .env
```

### 5. Workflow Behavior

The GitHub Actions workflow (`/.github/workflows/deploy.yml`) will:

1. **On every push/PR**:
   - Install dependencies
   - Run linter (client)
   - Build client application
   - Build Docker images
   - Run tests (if added)

2. **On push to main/master**:
   - All of the above
   - SSH into your server
   - Pull latest code
   - Rebuild and restart containers
   - Clean up old Docker images

## Server Deployment

### Manual Deployment

If you prefer manual deployment or want to test without GitHub Actions:

```bash
# SSH into server
ssh user@your-server-ip

# Navigate to project
cd /opt/gavinpicard

# Pull latest changes
git pull origin main

# Rebuild and restart
docker compose down
docker compose build --no-cache
docker compose up -d

# Check logs
docker compose logs -f
```

### Production Considerations

1. **Reverse Proxy (Nginx/Traefik)**

   For production, use a reverse proxy like Nginx:

   ```nginx
   # /etc/nginx/sites-available/gavinpicard
   server {
       listen 80;
       server_name gavinpicard.com www.gavinpicard.com;
       
       location / {
           proxy_pass http://localhost:80;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
       
       location /api {
           proxy_pass http://localhost:8080;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
   }
   ```

2. **SSL/HTTPS**

   Use Let's Encrypt with Certbot:

   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d gavinpicard.com -d www.gavinpicard.com
   ```

3. **Environment Variables**

   Update `.env` on server with production values:

   ```env
   FRONTEND_URL=https://gavinpicard.com
   VITE_API_BASE_URL=https://gavinpicard.com/api
   ADMIN_API_KEY=<strong-random-key>
   ```

4. **Database Backups**

   Set up regular backups:

   ```bash
   # Add to crontab
   0 2 * * * docker compose exec -T db mysqldump -uroot -p${DB_ROOT_PASSWORD} blog > /opt/backups/blog-$(date +\%Y\%m\%d).sql
   ```

5. **Monitoring**

   Consider using tools like:
   - Docker healthchecks (already in compose file)
   - PM2 for process management (alternative to Docker)
   - Monitoring services (Datadog, New Relic, etc.)

## Environment Variables

### Client (.env or build-time)

- `VITE_API_BASE_URL` - API endpoint URL (required at build time)

### Server (.env)

- `DB_HOST` - Database host (usually `db` in Docker, `localhost` standalone)
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `PORT` - Server port (default: 8080)
- `ADMIN_API_KEY` - Secret key for admin authentication
- `FRONTEND_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

### Docker Compose (.env in root)

All variables listed in the `.env.example` file.

## Troubleshooting

### Containers won't start

```bash
# Check logs
docker compose logs

# Check specific service
docker compose logs server
docker compose logs client
docker compose logs db

# Restart services
docker compose restart
```

### Database connection issues

```bash
# Test database connection
docker compose exec db mysql -uroot -p

# Check if database is initialized
docker compose exec db mysql -uroot -p -e "SHOW DATABASES;"

# Reset database (WARNING: deletes all data)
docker compose down -v
docker compose up -d
```

### Build failures

```bash
# Clear Docker cache
docker compose build --no-cache

# Remove old images
docker image prune -a
```

### Port conflicts

If ports are already in use, update `.env`:

```env
CLIENT_PORT=3000
SERVER_PORT=3001
DB_PORT=3307
```

### GitHub Actions deployment fails

1. Check SSH key is correct in GitHub Secrets
2. Verify server has Docker and Docker Compose installed
3. Ensure deployment path exists and has correct permissions
4. Check workflow logs in GitHub Actions tab

## Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)

