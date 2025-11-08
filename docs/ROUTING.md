# Routing Documentation

## Route Structure

```
/ - Homepage
/auth?mode=login|signup - Authentication
/product/:id - Product details
/categories/:category - Category pages
/cart - Shopping cart
/checkout - Checkout (protected)
/account - Account dashboard (protected)
  /account/personal-info
  /account/addresses
  /account/orders
  /account/wishlist
  /account/deals
```

## Protected Routes

Routes requiring authentication use `ProtectedRoute` wrapper:

```typescript
<Route 
  path="/checkout" 
  element={<ProtectedRoute><Checkout /></ProtectedRoute>} 
/>
```

## Navigation

```typescript
// Programmatic navigation
import { useNavigate } from 'react-router-dom';
const navigate = useNavigate();
navigate('/account');

// Links
import { Link } from 'react-router-dom';
<Link to="/product/123">View Product</Link>
```

---

Last updated: 2025-11-08
