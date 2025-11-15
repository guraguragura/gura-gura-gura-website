# Development Medusa Backend Setup

This guide helps you set up a separate development Medusa instance isolated from production.

## Architecture

- **Production**: Port 9000, `medusa-v2` database → Used by gura.rw
- **Development**: Port 9001, `medusa_dev` schema → Used by Lovable preview

## Setup Steps on VPS

### 1. Create Development Schema in Supabase

```sql
-- Connect to your Supabase PostgreSQL
CREATE SCHEMA IF NOT EXISTS medusa_dev;
```

### 2. Clone Medusa Backend for Development

```bash
# Navigate to web root
cd /var/www

# Clone production to development
sudo cp -r medusa-backend medusa-backend-dev

# Navigate to dev directory
cd medusa-backend-dev
```

### 3. Configure Development Environment

```bash
# Copy the development environment file
cp .env.development .env

# Install dependencies (including @supabase/supabase-js for admin widgets)
npm install
```

**Note**: The `@supabase/supabase-js` dependency is required for the Promotional Banners widget in the MedusaJS admin panel.

### 4. Run Database Migrations for Dev

```bash
# Run migrations to set up medusa_dev schema
npx medusa db:migrate

# Seed with test data
npx medusa seed

# Build admin panel with custom widgets
npm run build
```

### 5. Start Development Server

```bash
# Start on port 9001
npm run dev
```

Or set up as a systemd service:

```bash
# Create service file
sudo nano /etc/systemd/system/medusa-dev.service
```

```ini
[Unit]
Description=Medusa Development Server
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/medusa-backend-dev
Environment="NODE_ENV=development"
ExecStart=/usr/bin/npm run dev
Restart=always

[Install]
WantedBy=multi-user.target
```

```bash
# Enable and start service
sudo systemctl enable medusa-dev
sudo systemctl start medusa-dev
sudo systemctl status medusa-dev
```

### 6. Configure Nginx (Optional)

Add a proxy for the dev instance if you want a subdomain:

```nginx
server {
    listen 80;
    server_name dev-api.gura.rw;

    location / {
        proxy_pass http://localhost:9001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Verification

1. **Check dev server is running**:
   ```bash
   curl http://localhost:9001/health
   ```

2. **Check from Lovable**:
   - Lovable preview should connect to `http://102.68.86.157:9001`
   - Products should load from dev instance

3. **Check production is untouched**:
   ```bash
   curl http://localhost:9000/health
   ```
   - gura.rw should still work normally

## Workflow

1. **Development**: Work in Lovable → Changes affect dev Medusa (port 9001)
2. **Testing**: Test all features with dev data
3. **Deployment**: When ready, apply changes to production Medusa (port 9000)

## Database Management

- **Dev schema**: `medusa_dev` - Safe to reset, seed with test data
- **Production DB**: `medusa-v2` - Keep untouched during development

## Troubleshooting

- **Port conflict**: Ensure port 9001 is not in use
- **Database connection**: Verify Supabase connection string
- **CORS errors**: Check STORE_CORS includes your Lovable preview URL
- **Migration errors**: Run migrations in dev schema only

## Environment Variables

- Production: Uses `/var/www/medusa-backend/.env`
- Development: Uses `/var/www/medusa-backend-dev/.env`

Keep these separate to prevent accidental production changes!
