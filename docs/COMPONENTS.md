# Component Library Documentation

## Overview

Gura uses a component-based architecture with shadcn/ui, Radix UI primitives, and custom components organized by feature.

## Component Categories

### Layout Components

#### PageLayout
Main application wrapper with consistent header and footer.

```typescript
// Usage
<PageLayout>
  <YourPageContent />
</PageLayout>
```

#### TopInfoBar
Top notification banner for announcements.

#### Navbar
Main navigation with cart, wishlist, and user menu.

#### Footer
Site footer with links and social media.

### Feature Components

#### Authentication
- `LoginForm`: User login
- `SignupForm`: User registration
- `BasicInfoFields`: Reusable form fields

#### Account Management
- `PersonalInfo`: Profile editing
- `PasswordChangeForm`: Password updates
- `Addresses`: Address management
- `Orders`: Order history
- `Wishlist`: Saved products
- `DealNotifications`: Deal subscriptions

#### Products
- `ProductCard`: Product display
- `ProductGrid`: Product listing
- `ProductDetail`: Full product view

#### Cart
- `CartItem`: Individual cart item
- `CartSummary`: Order total

### UI Components (shadcn/ui)

- Button, Input, Dialog, Toast, Select
- Form components with validation
- All customizable via variants

## Best Practices

1. Use semantic design tokens from index.css
2. Implement proper TypeScript interfaces
3. Handle loading and error states
4. Use React Hook Form for forms
5. Add accessibility attributes

---

Last updated: 2025-11-08
