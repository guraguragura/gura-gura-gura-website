# Medusa Backend Deployment Guide

This document explains how to deploy the Medusa backend to your VPS using the automated CI/CD pipeline.

## Architecture

- **Staging Environment**: Port 9001, deploys from `staging` branch
- **Production Environment**: Port 9002, deploys from `production` branch
- **Process Manager**: PM2 for zero-downtime deployments
- **Database**: Supabase PostgreSQL (separate instances for staging/production)
- **Cache**: Redis running on VPS

## Initial VPS Setup

### 1. Run the setup script on your VPS

```bash
# SSH into your VPS
ssh user@102.68.86.157

# Download and run the setup script
wget https://raw.githubusercontent.com/YOUR_REPO/main/medusa-backend/deploy/setup-vps.sh
chmod +x setup-vps.sh
sudo ./setup-vps.sh
```

### 2. Configure GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions → New repository secret

Add the following secrets:

#### SSH Configuration
- `VPS_SSH_PRIVATE_KEY`: Your SSH private key for VPS access
- `VPS_HOST`: `102.68.86.157`
- `VPS_USER`: SSH username (e.g., `ubuntu`, `root`)

#### Staging Environment
- `MEDUSA_DATABASE_URL_staging`: 
  ```
  postgresql://postgres:PASSWORD@db.wxniywyujrxlwraocszi.supabase.co:5432/postgres?schema=medusa_staging
  ```
- `MEDUSA_JWT_SECRET_staging`: Random string (min 32 chars)
- `MEDUSA_COOKIE_SECRET_staging`: Random string (min 32 chars)
- `MEDUSA_STORE_CORS_staging`: `https://your-staging-domain.lovable.app,http://localhost:5173`
- `MEDUSA_ADMIN_CORS_staging`: `https://your-staging-domain.lovable.app,http://localhost:9001`

#### Production Environment
- `MEDUSA_DATABASE_URL_production`:
  ```
  postgresql://postgres:PASSWORD@db.wxniywyujrxlwraocszi.supabase.co:5432/postgres?schema=medusa_production
  ```
- `MEDUSA_JWT_SECRET_production`: Random string (min 32 chars, different from staging)
- `MEDUSA_COOKIE_SECRET_production`: Random string (min 32 chars, different from staging)
- `MEDUSA_STORE_CORS_production`: `https://your-production-domain.com`
- `MEDUSA_ADMIN_CORS_production`: `https://your-production-domain.com`

#### Shared Configuration
- `MEDUSA_REDIS_URL`: `redis://localhost:6379`

### 3. Generate Secrets

Use these commands to generate secure secrets:

```bash
# Generate JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate Cookie secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Deployment Process

### Automatic Deployment

The CI/CD pipeline automatically deploys when:
1. You push changes to `medusa-backend/**` in the `staging` or `production` branch
2. You manually trigger the workflow from GitHub Actions

### Manual Deployment

1. Go to GitHub Actions → Deploy Medusa Backend → Run workflow
2. Select the environment (staging or production)
3. Click "Run workflow"

## Deployment Flow

1. **Build**: Compiles TypeScript and prepares the application
2. **Package**: Creates a tarball of the built application
3. **Upload**: Transfers the package to the VPS
4. **Extract**: Unpacks the application in a new release directory
5. **Install**: Installs production dependencies
6. **Configure**: Creates environment-specific `.env` file
7. **Migrate**: Runs database migrations
8. **Switch**: Updates symlink to point to new release
9. **Restart**: Restarts PM2 process with zero downtime
10. **Verify**: Performs health check
11. **Cleanup**: Removes old releases (keeps last 5)

## Rollback

If deployment fails, the pipeline automatically rolls back to the previous version.

Manual rollback:

```bash
# SSH into VPS
ssh user@102.68.86.157

# For staging
cd /var/www/medusa-staging
LATEST_BACKUP=$(ls -dt backup-* | head -n 1)
ln -sfn $LATEST_BACKUP current
pm2 restart medusa-staging

# For production
cd /var/www/medusa-production
LATEST_BACKUP=$(ls -dt backup-* | head -n 1)
ln -sfn $LATEST_BACKUP current
pm2 restart medusa-production
```

## Monitoring

### Check application status

```bash
# View PM2 processes
pm2 status

# View logs
pm2 logs medusa-staging --lines 100
pm2 logs medusa-production --lines 100

# Monitor in real-time
pm2 monit
```

### Health checks

```bash
# Staging
curl http://localhost:9001/health

# Production
curl http://localhost:9002/health
```

## Environment-Specific Endpoints

### Staging
- Backend API: `http://102.68.86.157:9001`
- Admin Dashboard: `http://102.68.86.157:9001/app`
- Health Check: `http://102.68.86.157:9001/health`

### Production
- Backend API: `http://102.68.86.157:9002`
- Admin Dashboard: `http://102.68.86.157:9002/app`
- Health Check: `http://102.68.86.157:9002/health`

## Troubleshooting

### Deployment fails during migration

```bash
# SSH into VPS
ssh user@102.68.86.157

# Check database connectivity
cd /var/www/medusa-staging/current  # or medusa-production
psql $DATABASE_URL -c "SELECT version();"

# Run migrations manually
npx medusa migrations run
```

### Application won't start

```bash
# Check PM2 logs
pm2 logs medusa-staging --err --lines 50

# Restart the application
pm2 restart medusa-staging

# Check port availability
netstat -tulpn | grep 9001
```

### Clear application cache

```bash
# Restart Redis
sudo systemctl restart redis-server

# Restart Medusa
pm2 restart medusa-staging
pm2 restart medusa-production
```

## Updating Frontend to Use Environment-Specific Backends

Update your frontend `.env` files:

```bash
# .env.staging
VITE_MEDUSA_PUBLIC_BASE_URL=http://102.68.86.157:9001

# .env.production
VITE_MEDUSA_PUBLIC_BASE_URL=http://102.68.86.157:9002
```

## Security Recommendations

1. **Use HTTPS**: Setup Nginx reverse proxy with SSL certificates
2. **Firewall**: Restrict ports 9001/9002 to only your frontend domains
3. **Database**: Use separate Supabase projects for staging and production
4. **Secrets Rotation**: Regularly rotate JWT and cookie secrets
5. **SSH Keys**: Use SSH keys instead of passwords, disable password auth

## Next Steps

1. Setup Nginx reverse proxy for SSL termination
2. Configure custom domains for staging and production
3. Setup monitoring and alerting (PM2 Plus, Sentry, etc.)
4. Implement automated database backups
5. Setup log aggregation (ELK stack, CloudWatch, etc.)
