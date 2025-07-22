
# Deployment Guide

## Production Deployment

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase project configured
- Environment variables set

### Environment Variables
Create `.env.production` file:
```bash
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

### Build and Deploy

#### Option 1: Static Hosting (Netlify/Vercel)
```bash
npm run build
# Deploy dist/ folder to your hosting provider
```

#### Option 2: Docker Deployment
```bash
docker build -t gura-app .
docker run -p 8080:8080 gura-app
```

#### Option 3: Server Deployment
```bash
npm ci --production
npm run build
npm run preview
```

### Post-Deployment Checklist

1. **Security Configuration**
   - [ ] Enable HTTPS
   - [ ] Configure CSP headers
   - [ ] Set up CORS policies
   - [ ] Enable rate limiting

2. **Performance Optimization**
   - [ ] Configure CDN
   - [ ] Enable gzip compression
   - [ ] Set up caching headers
   - [ ] Configure image optimization

3. **Monitoring Setup**
   - [ ] Verify Sentry error tracking
   - [ ] Set up performance monitoring
   - [ ] Configure uptime monitoring
   - [ ] Set up log aggregation

4. **Database Setup**
   - [ ] Run Supabase migrations
   - [ ] Configure RLS policies
   - [ ] Set up backup strategy
   - [ ] Verify connection pooling

### Performance Monitoring

Monitor these key metrics:
- Page load time < 3s
- First Contentful Paint < 1.8s
- Largest Contentful Paint < 2.5s
- Cumulative Layout Shift < 0.1
- First Input Delay < 100ms

### Security Monitoring

Set up alerts for:
- Authentication failures
- Rate limit violations
- SQL injection attempts
- XSS attempts
- Unusual traffic patterns

### Backup and Recovery

1. **Database Backups**
   - Automated daily Supabase backups
   - Point-in-time recovery capability
   - Test restore procedures monthly

2. **Code Backups**
   - Git repository with remote origin
   - Tagged releases for rollback
   - Deployment artifact storage

### Scaling Considerations

As your application grows:
- Implement Redis for session management
- Set up load balancing
- Configure auto-scaling
- Optimize database queries
- Implement caching strategies

### Troubleshooting

Common deployment issues:
- Environment variable misconfiguration
- Build failures due to missing dependencies
- Database connection issues
- CORS configuration problems
- SSL certificate issues

For support, check:
1. Application logs
2. Sentry error reports
3. Browser developer tools
4. Network tab for failed requests
5. Supabase dashboard for database issues
