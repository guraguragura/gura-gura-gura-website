#!/bin/bash

# Medusa Backend VPS Setup Script
# This script sets up the necessary environment for running Medusa backend on VPS
# Run this script once on your VPS before the first deployment

set -e

echo "=== Medusa Backend VPS Setup ==="

# Check if running as root
if [ "$EUID" -ne 0 ]; then 
  echo "Please run as root (use sudo)"
  exit 1
fi

# Update system
echo "Updating system packages..."
apt-get update
apt-get upgrade -y

# Install Node.js 20.x
echo "Installing Node.js 20.x..."
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt-get install -y nodejs

# Install Yarn
echo "Installing Yarn..."
npm install -g yarn

# Install PM2
echo "Installing PM2..."
npm install -g pm2

# Setup PM2 startup script
pm2 startup systemd -u $SUDO_USER --hp /home/$SUDO_USER
pm2 save

# Install Redis (if not already installed)
if ! command -v redis-server &> /dev/null; then
  echo "Installing Redis..."
  apt-get install -y redis-server
  systemctl enable redis-server
  systemctl start redis-server
else
  echo "Redis already installed"
fi

# Create deployment directories
echo "Creating deployment directories..."
mkdir -p /var/www/medusa-staging
mkdir -p /var/www/medusa-production
chown -R $SUDO_USER:$SUDO_USER /var/www/medusa-staging
chown -R $SUDO_USER:$SUDO_USER /var/www/medusa-production

# Setup firewall rules (if ufw is installed)
if command -v ufw &> /dev/null; then
  echo "Configuring firewall..."
  ufw allow 9001/tcp comment 'Medusa Staging'
  ufw allow 9002/tcp comment 'Medusa Production'
fi

# Create log directories
echo "Creating log directories..."
mkdir -p /var/log/medusa
chown -R $SUDO_USER:$SUDO_USER /var/log/medusa

# Setup logrotate for Medusa logs
cat > /etc/logrotate.d/medusa << EOF
/var/log/medusa/*.log {
    daily
    rotate 14
    compress
    delaycompress
    notifempty
    create 0640 $SUDO_USER $SUDO_USER
    sharedscripts
}
EOF

# Install PostgreSQL client tools (if not already installed)
if ! command -v psql &> /dev/null; then
  echo "Installing PostgreSQL client..."
  apt-get install -y postgresql-client
fi

echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "1. Configure GitHub Secrets in your repository:"
echo "   - VPS_SSH_PRIVATE_KEY: Your SSH private key"
echo "   - VPS_HOST: Your VPS IP (102.68.86.157)"
echo "   - VPS_USER: SSH user (e.g., ubuntu, root)"
echo "   - MEDUSA_DATABASE_URL_staging: Staging database URL"
echo "   - MEDUSA_DATABASE_URL_production: Production database URL"
echo "   - MEDUSA_JWT_SECRET_staging: Staging JWT secret"
echo "   - MEDUSA_JWT_SECRET_production: Production JWT secret"
echo "   - MEDUSA_COOKIE_SECRET_staging: Staging cookie secret"
echo "   - MEDUSA_COOKIE_SECRET_production: Production cookie secret"
echo "   - MEDUSA_REDIS_URL: Redis URL (redis://localhost:6379)"
echo "   - MEDUSA_STORE_CORS_staging: Staging CORS origins"
echo "   - MEDUSA_STORE_CORS_production: Production CORS origins"
echo "   - MEDUSA_ADMIN_CORS_staging: Staging admin CORS origins"
echo "   - MEDUSA_ADMIN_CORS_production: Production admin CORS origins"
echo ""
echo "2. Push changes to staging or production branch to trigger deployment"
echo ""
echo "Staging deployment will be accessible at: http://102.68.86.157:9001"
echo "Production deployment will be accessible at: http://102.68.86.157:9002"
