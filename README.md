# Gura E-commerce Platform

A modern, full-featured e-commerce platform built with React, TypeScript, and Supabase. Designed for scalability, security, and exceptional user experience.

## 🚀 Project Overview

Gura is a comprehensive e-commerce solution offering:
- **Product Management**: Full catalog with categories, search, and filtering
- **User Authentication**: Secure signup/login with profile management
- **Shopping Cart**: Real-time cart management with persistent storage
- **Address Management**: Multiple delivery addresses with geocoding
- **Order Management**: Complete order lifecycle tracking
- **Reviews & Ratings**: Customer product reviews
- **Marketing Features**: Newsletter, promotional banners, deal notifications
- **Admin Dashboard**: Product and order management capabilities

**Project URL**: https://lovable.dev/projects/b4f214f4-158c-4fbd-8bda-6093ab8b6a4d

## 🛠 Technology Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router v6** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Radix UI** - Accessible component primitives
- **Framer Motion** - Animation library
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication
  - Row-Level Security (RLS)
  - Real-time subscriptions
- **Sentry** - Error tracking and monitoring
- **React Query** - Server state management

### Development Tools
- **Vitest** - Unit testing
- **Cypress** - E2E testing
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Lint-staged** - Pre-commit linting

## 📚 Documentation

- **[Architecture Guide](docs/ARCHITECTURE.md)** - System architecture and design patterns
- **[Authentication](docs/AUTHENTICATION.md)** - Auth flows and security
- **[Database Schema](docs/DATABASE.md)** - Database structure and RLS policies
- **[Components](docs/COMPONENTS.md)** - Component library reference
- **[Routing](docs/ROUTING.md)** - Application routes and navigation
- **[API Reference](docs/API.md)** - Supabase integration and hooks
- **[Development Guide](docs/DEVELOPMENT.md)** - Setup and workflow
- **[Security](docs/SECURITY.md)** - Security implementation
- **[Features](docs/FEATURES.md)** - Feature documentation
- **[Troubleshooting](docs/TROUBLESHOOTING.md)** - Common issues and solutions
- **[Deployment](docs/DEPLOYMENT.md)** - Production deployment guide
- **[Contributing](CONTRIBUTING.md)** - Contribution guidelines

## 🚦 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git
- Supabase account (for backend features)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Environment Variables

Create a `.env.local` file with:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SENTRY_DSN=your_sentry_dsn (optional)
```

## 📝 Available Scripts

```sh
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm test             # Run unit tests
npm run test:e2e     # Run E2E tests
npm run format       # Format code with Prettier
npm run lint         # Lint code
```

## 🏗 Project Structure

```
src/
├── components/          # React components
│   ├── account/        # Account management components
│   ├── address/        # Address management
│   ├── auth/           # Authentication components
│   ├── cart/           # Shopping cart
│   ├── layout/         # Layout components
│   ├── product/        # Product display
│   └── ui/             # Reusable UI components (shadcn)
├── contexts/           # React Context providers
├── hooks/              # Custom React hooks
├── pages/              # Page components (routes)
├── lib/                # Utility functions
├── integrations/       # Third-party integrations
│   └── supabase/      # Supabase client and types
└── main.tsx           # Application entry point
```

## 🔐 Security

This project implements comprehensive security measures including:
- Row-Level Security (RLS) on all database tables
- JWT-based authentication
- Input validation with Zod schemas
- HTTPS-only communication
- Rate limiting on API endpoints
- CSRF and XSS protection

See [SECURITY.md](docs/SECURITY.md) for detailed security documentation.

## 🧪 Testing

```sh
# Run unit tests
npm test

# Run unit tests with coverage
npm run test:coverage

# Run E2E tests
npm run test:e2e
```

## 🚀 Deployment

### Deploy with Lovable
Simply open [Lovable](https://lovable.dev/projects/b4f214f4-158c-4fbd-8bda-6093ab8b6a4d) and click on Share → Publish.

### Custom Domain Deployment
For custom domains, we recommend using Netlify or Vercel:

```sh
# Build the project
npm run build

# Deploy the dist/ folder to your hosting provider
```

See [DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed deployment instructions.

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary and confidential.

## 🆘 Support

- **Documentation**: Check the [docs/](docs/) folder
- **Issues**: Report bugs via GitHub Issues
- **Email**: support@gura.com
- **Troubleshooting**: See [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)

## 🌟 Key Features

- ✅ **Responsive Design**: Mobile-first, works on all devices
- ✅ **SEO Optimized**: Proper meta tags and semantic HTML
- ✅ **Accessibility**: WCAG 2.1 AA compliant
- ✅ **Performance**: Optimized with lazy loading and code splitting
- ✅ **Real-time Updates**: Live cart and order updates
- ✅ **Secure Payments**: PCI DSS compliant integration ready
- ✅ **Multi-language Ready**: i18n infrastructure in place
- ✅ **Dark Mode**: Full dark mode support

## 🗺 Roadmap

- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] Order tracking with real-time updates
- [ ] Multi-vendor support
- [ ] Advanced analytics dashboard
- [ ] Mobile app (React Native)
- [ ] AI-powered product recommendations
- [ ] Live chat support
- [ ] Inventory management system

---

Built with ❤️ by the Gura Team
