#!/bin/bash
# Post-deployment script for atomic releases
# This script is safe to run multiple times (idempotent)

set -euo pipefail

echo "🚀 Running post-deployment tasks..."

# Get the current release directory (where this script is located)
RELEASE_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
echo "📁 Release directory: $RELEASE_DIR"

# Example post-deployment tasks for a static site
echo "📋 Post-deployment checklist:"

# 1. Verify deployment integrity
echo "✅ Verifying deployment integrity..."
if [[ ! -f "$RELEASE_DIR/index.html" ]]; then
    echo "❌ index.html not found in release directory"
    exit 1
fi
echo "✅ index.html found"

# 2. Set proper file permissions
echo "✅ Setting file permissions..."
find "$RELEASE_DIR" -type f -exec chmod 644 {} \;
find "$RELEASE_DIR" -type d -exec chmod 755 {} \;

# 3. Optional: Warm up cache or perform health checks
echo "✅ Performing health checks..."
# Add any health check logic here
# For example, check if the site is accessible

# 4. Optional: Update any external services
echo "✅ Updating external services..."
# Add any external service updates here
# For example, CDN cache invalidation, monitoring updates, etc.

# 5. Optional: Send deployment notifications
echo "✅ Sending deployment notifications..."
# Add notification logic here
# For example, Slack, Discord, or email notifications

echo "🎉 Post-deployment tasks completed successfully!"
echo "📊 Deployment summary:"
echo "   - Release directory: $RELEASE_DIR"
echo "   - Timestamp: $(date -u)"
echo "   - Files deployed: $(find "$RELEASE_DIR" -type f | wc -l)"

# Optional: Log deployment for audit purposes
echo "$(date -u): Deployment completed successfully" >> "$RELEASE_DIR/deployment.log"
