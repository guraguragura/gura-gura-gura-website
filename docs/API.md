# API & Integration Documentation

## Supabase Client

```typescript
import { supabase } from '@/integrations/supabase/client';

// Query data
const { data, error } = await supabase
  .from('customer')
  .select('*')
  .eq('user_id', userId);

// Insert data
const { error } = await supabase
  .from('customer_address')
  .insert({ ...addressData });

// Update data
const { error } = await supabase
  .from('customer')
  .update({ first_name: 'John' })
  .eq('id', customerId);
```

## Custom Hooks

### useAuth
```typescript
const { user, isLoading, signIn, signOut } = useAuth();
```

### useCart
```typescript
const { cart, addToCart, removeFromCart, total } = useCart();
```

### useCustomerProfile
```typescript
const { customer, isLoading, setCustomer } = useCustomerProfile();
```

## Error Handling

Always handle Supabase errors:

```typescript
try {
  const { data, error } = await supabase.from('table').select();
  if (error) throw error;
  return data;
} catch (error) {
  console.error('Error:', error);
  toast.error('Failed to load data');
}
```

---

Last updated: 2025-11-08
