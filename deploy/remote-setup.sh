#!/bin/bash
# Remote server setup script for atomic deployments
# This script must be run manually on the server (outside CI)

set -euo pipefail

# Configuration
TARGET_BASE="/var/www/gura"
ENVIRONMENTS=("dev" "staging")

echo "🚀 Setting up atomic deployment structure on server..."

# Check if running as root or with sudo
if [[ $EUID -eq 0 ]]; then
    echo "⚠️  Running as root. This is not recommended for production."
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Aborted."
        exit 1
    fi
fi

# Create base directory structure
echo "📁 Creating base directory structure..."
mkdir -p "$TARGET_BASE"

# Create environment directories
for env in "${ENVIRONMENTS[@]}"; do
    echo "📁 Setting up $env environment..."
    
    # Create releases directory
    mkdir -p "$TARGET_BASE/$env/releases"
    
    # Create initial current symlink (will be updated by deployments)
    if [[ ! -L "$TARGET_BASE/$env/current" ]]; then
        # Create a placeholder directory for initial current symlink
        mkdir -p "$TARGET_BASE/$env/current"
        echo "📁 Created placeholder current directory for $env"
    else
        echo "✅ Current symlink already exists for $env"
    fi
    
    echo "✅ Environment $env setup complete"
done

# Set appropriate permissions
echo "🔐 Setting permissions..."
chmod -R 755 "$TARGET_BASE"

# Display structure
echo "📋 Directory structure created:"
tree "$TARGET_BASE" 2>/dev/null || find "$TARGET_BASE" -type d | sort

echo ""
echo "✅ Remote server setup completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Create a deploy user: sudo useradd -m -s /bin/bash deploy"
echo "2. Add your SSH public key to ~/.ssh/authorized_keys for the deploy user"
echo "3. Configure Nginx to point to $TARGET_BASE/<env>/current"
echo "4. Set up GitHub Environments and Secrets as documented in README-CI-CD.md"
echo ""
echo "🔗 Example Nginx configuration:"
echo "   root $TARGET_BASE/dev/current;  # for development"
echo "   root $TARGET_BASE/staging/current;  # for staging"
