# Vercel Deployment Troubleshooting Guide

## Issue: Address Autocomplete Not Working on Vercel

The address autocomplete functionality works locally but fails on the deployed Vercel site at https://house-max.vercel.app/

## Debugging Steps Added

### 1. Enhanced Logging
Added comprehensive logging to both the client and server components:

- **AddressAutocomplete Component**: Now logs API responses and errors to browser console
- **API Route**: Added detailed server-side logging for debugging on Vercel
- **Test Endpoint**: Created `/api/test` to verify API routes and environment variables

### 2. Test API Endpoint
Visit `/api/test` to verify:
- API routes are working
- Environment variables are accessible  
- Geoapify API key is properly configured

### 3. Common Issues & Solutions

#### Environment Variables Not Set on Vercel
**Symptoms**: API works locally but fails on deployment
**Solution**: 
1. Go to Vercel Dashboard → Project Settings → Environment Variables
2. Add `GEOAPIFY_API_KEY` with value: `1c884af978c44d75addea0c28b38ac2d`
3. Set for "Production", "Preview", and "Development" environments
4. Redeploy the project

#### CORS Issues
**Symptoms**: API calls blocked by browser
**Solution**: Vercel automatically handles CORS for same-origin requests

#### API Route Not Found (404)
**Symptoms**: `/api/address-search` returns 404
**Solution**: Ensure the file is at `src/app/api/address-search/route.ts`

#### Rate Limiting
**Symptoms**: API works initially then stops
**Solution**: Check Geoapify dashboard for rate limit status (3,000 requests/day free)

### 4. Fallback Mechanisms
The system has multiple fallbacks:
1. **Primary**: Geoapify API (requires API key)
2. **Fallback**: Nominatim/OpenStreetMap (free, no key required)
3. **Final Fallback**: Local database suggestions

### 5. Browser Console Debugging
Open browser developer tools on https://house-max.vercel.app/ and:
1. Try typing in the search box
2. Check console for error messages
3. Look for API response logs
4. Verify network requests are being made

### 6. Manual Testing URLs
Test these endpoints directly:
- `https://house-max.vercel.app/api/test` - Basic API functionality
- `https://house-max.vercel.app/api/address-search?q=123%20main&suggestions=true` - Autocomplete API

### 7. Expected Behavior
When working correctly:
- Typing 3+ characters should trigger API calls
- Console should show API response logs
- Dropdown should appear with address suggestions
- Loading spinner should appear during requests

### 8. Server-Side Logs
Check Vercel function logs in the Vercel dashboard for:
- Environment variable debugging info
- Geoapify API request/response logs
- Error messages from failed requests

## Quick Fix Commands

```bash
# Redeploy with fresh environment variables
npx vercel --prod

# Pull environment variables locally to verify
npx vercel env pull .env.local

# Test API locally
npm run dev
curl "http://localhost:3000/api/test"
```

## Next Steps
1. Check browser console on deployed site
2. Verify environment variables in Vercel dashboard
3. Check Vercel function logs for detailed error messages
4. Test the `/api/test` endpoint to verify basic functionality 