# CI/CD Pipeline Documentation

This document describes the CI/CD pipeline setup for the Gura App using atomic releases pattern.

## 🚀 Branch Flow

```
feature-branch → PR to development (CI only) → merge to development (auto-deploy to /var/www/gura/dev/current) → merge to staging (auto-deploy to /var/www/gura/staging/current)
```

- **main**: No automatic deployment (idle for now)
- **development**: Auto-deploys to `/var/www/gura/dev/current`
- **staging**: Auto-deploys to `/var/www/gura/staging/current`
- **PRs**: Run CI (lint/test/build) but do not deploy

## 🔄 Atomic Releases Pattern

Each deployment creates a timestamped release directory and updates a symlink:

```
/var/www/gura/dev/
├── releases/
│   ├── 20241221_143022/  # Latest release
│   ├── 20241221_142015/  # Previous release
│   └── ...
└── current -> releases/20241221_143022/  # Symlink to latest
```

### Benefits
- **Zero-downtime deployments**: New release is fully ready before switching
- **Instant rollback**: Point `current` symlink to previous release
- **Safe deployments**: Keep last 5 releases for quick rollback

## 🛠️ GitHub Configuration

### Required Environments
Create these environments in GitHub repository settings:

1. **development**
2. **staging**

### Required Secrets (per environment)
Set these secrets for each environment:

| Secret | Description | Example |
|--------|-------------|---------|
| `SSH_HOST` | Server hostname/IP | `gura-vps.example.com` |
| `SSH_USER` | SSH username | `deploy` |
| `SSH_PORT` | SSH port (optional) | `22` |
| `SSH_KEY` | Private SSH key | `-----BEGIN OPENSSH PRIVATE KEY-----...` |
| `TARGET_DIR` | Target directory path | `/var/www/gura/dev` |

### Optional Variables (per environment)
| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_VERSION` | Node.js version | `20` |
| `BUILD_CMD` | Build command | `npm ci && npm run build` |

## 🖥️ Server Setup (Manual Steps)

### 1. Create Deploy User
```bash
# Create deploy user
sudo useradd -m -s /bin/bash deploy

# Add to appropriate groups
sudo usermod -aG www-data deploy

# Set up SSH directory
sudo mkdir -p /home/deploy/.ssh
sudo chmod 700 /home/deploy/.ssh
sudo chown deploy:deploy /home/deploy/.ssh
```

### 2. Authorize SSH Key
```bash
# Add your public key to authorized_keys
sudo -u deploy tee /home/deploy/.ssh/authorized_keys << EOF
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC... your-public-key-here
EOF

sudo chmod 600 /home/deploy/.ssh/authorized_keys
sudo chown deploy:deploy /home/deploy/.ssh/authorized_keys
```

### 3. Run Remote Setup Script
```bash
# Copy and run the setup script on the server
scp deploy/remote-setup.sh deploy@your-server:/tmp/
ssh deploy@your-server "chmod +x /tmp/remote-setup.sh && /tmp/remote-setup.sh"
```

### 4. Configure Nginx
```bash
# Copy nginx configuration
sudo cp deploy/nginx-example.conf /etc/nginx/sites-available/gura-app

# Edit the configuration to match your domains
sudo nano /etc/nginx/sites-available/gura-app

# Enable the site
sudo ln -sf /etc/nginx/sites-available/gura-app /etc/nginx/sites-enabled/

# Test and reload nginx
sudo nginx -t
sudo systemctl reload nginx
```

## 📋 Workflow Details

### CI Pipeline (`.github/workflows/ci.yml`)
**Triggers**: 
- Push to any branch
- Pull requests to `development` or `staging`

**Steps**:
1. Checkout code
2. Setup Node.js (version 20 or from `package.json` engines)
3. Install dependencies (`npm ci`)
4. Run linting (`npm run lint --if-present`)
5. Run tests (`npm test --if-present`)
6. Build application (`npm run build`)
7. Upload build artifacts as `web-dist`

### Deploy Development (`.github/workflows/deploy-development.yml`)
**Triggers**: Push to `development` branch

**Steps**:
1. Checkout code
2. Setup Node.js
3. Build application
4. Detect build output directory (`dist` or `build`)
5. Create timestamped release directory on server
6. Sync build files to release directory
7. Update `current` symlink
8. Clean up old releases (keep last 5)
9. Run post-deploy script (if present)

### Deploy Staging (`.github/workflows/deploy-staging.yml`)
**Triggers**: Push to `staging` branch

**Steps**: Same as development deployment

## 🔧 Manual Operations

### Rollback to Previous Release
```bash
# SSH to server
ssh deploy@your-server

# List available releases
ls -la /var/www/gura/dev/releases/

# Rollback to specific release
ln -sfn /var/www/gura/dev/releases/20241221_142015 /var/www/gura/dev/current

# Verify rollback
ls -la /var/www/gura/dev/current
```

### Check Deployment Status
```bash
# Check current symlink
ls -la /var/www/gura/dev/current

# Check recent releases
ls -lt /var/www/gura/dev/releases/ | head -10

# Check deployment logs
tail -f /var/www/gura/dev/current/deployment.log
```

## 🚨 Troubleshooting

### Common Issues

1. **SSH Connection Failed**
   - Verify SSH key is correctly set in GitHub secrets
   - Check SSH user permissions on server
   - Ensure SSH key has proper format (no extra spaces/newlines)

2. **Build Output Directory Not Found**
   - Verify build command completes successfully
   - Check if `dist` or `build` directory is created
   - Review build logs in GitHub Actions

3. **Permission Denied on Server**
   - Ensure deploy user has write access to target directory
   - Check file ownership: `sudo chown -R deploy:www-data /var/www/gura/`

4. **Nginx 404 Errors**
   - Verify `current` symlink points to valid directory
   - Check nginx configuration syntax
   - Ensure nginx user can read the files

### Debug Commands
```bash
# Check GitHub Actions logs
# Go to Actions tab in GitHub repository

# Check server logs
sudo journalctl -u nginx -f

# Verify file permissions
ls -la /var/www/gura/dev/
ls -la /var/www/gura/dev/current/

# Test SSH connection
ssh -i your-private-key deploy@your-server "ls -la /var/www/gura/dev/"
```

## 📝 Notes

- **Package Manager**: Uses npm only; keep `package-lock.json` in VCS
- **Bun Lockfile**: `bun.lockb` has been removed from VCS to avoid conflicts
- **Node Version**: Defaults to Node 20, can be overridden with `NODE_VERSION` variable
- **Build Command**: Defaults to `npm ci && npm run build`, can be overridden with `BUILD_CMD` variable
- **Release Retention**: Keeps last 5 releases automatically
- **Post-deploy Script**: Optional, runs after successful deployment if present

## 🔗 Related Files

- `.github/workflows/ci.yml` - CI pipeline
- `.github/workflows/deploy-development.yml` - Development deployment
- `.github/workflows/deploy-staging.yml` - Staging deployment
- `deploy/remote-setup.sh` - Server setup script
- `deploy/post-deploy.sh` - Post-deployment tasks
- `deploy/nginx-example.conf` - Nginx configuration template
