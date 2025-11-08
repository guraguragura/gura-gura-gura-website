# Development Guide

## Setup

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Add your Supabase credentials

# Start dev server
npm run dev
```

## Available Scripts

```bash
npm run dev          # Development server (port 8080)
npm run build        # Production build
npm run preview      # Preview production build
npm test             # Run Vitest tests
npm run test:e2e     # Run Cypress E2E tests
npm run format       # Format with Prettier
npm run lint         # Lint code
```

## Environment Variables

Required in `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Code Style

- Use TypeScript for all new code
- Follow React best practices
- Use Tailwind design tokens
- Format with Prettier before committing
- Write tests for new features

## Git Workflow

```bash
git checkout -b feature/your-feature
# Make changes
git add .
git commit -m "feat: add amazing feature"
git push origin feature/your-feature
# Open PR
```

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run test:e2e

# With coverage
npm run test:coverage
```

---

Last updated: 2025-11-08
