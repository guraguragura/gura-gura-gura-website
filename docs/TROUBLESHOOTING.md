# Troubleshooting Guide

## Common Issues

### Authentication Issues

**Problem:** Cannot sign up or login
- Check Supabase URL and keys in `.env.local`
- Verify email is not already registered
- Check browser console for errors
- Ensure RLS policies are correctly set

**Problem:** "User not authorized" error
- RLS policies may be too restrictive
- Check that `user_id` is properly linked
- Verify JWT token in browser DevTools

### Address Issues

**Problem:** Cannot add address
- Ensure customer profile exists
- Check RLS policies on `customer_address` table
- Verify `customer_id` is correct
- Check console for validation errors

### Database Issues

**Problem:** "Permission denied" errors
- Enable RLS on table
- Add appropriate policies
- Check user authentication status

**Problem:** Data not updating
- Check RLS UPDATE policies
- Verify foreign key constraints
- Look for trigger errors

### Build Issues

**Problem:** Build fails
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`
- Check for TypeScript errors
- Verify all imports are correct

### Network Issues

**Problem:** API calls failing
- Check Supabase project status
- Verify internet connection
- Check CORS settings
- Look at Network tab in DevTools

## Getting Help

1. Check console logs
2. Review Supabase dashboard
3. Search existing GitHub issues
4. Contact support@gura.com

---

Last updated: 2025-11-08
