# Geoapify API Integration Setup

This document explains how to set up and configure Geoapify for enhanced address autocomplete and geocoding functionality in HOUSE/MAX.

## Overview

The HOUSE/MAX platform now supports **Geoapify** for:
- ✅ **Real-time address autocomplete** - Get suggestions as users type
- ✅ **Any address searchable** - Not limited to database properties  
- ✅ **Off-market properties** - Search any real address worldwide
- ✅ **Enhanced geocoding** - More accurate location data
- ✅ **Professional UX** - Keyboard navigation, loading states, smart suggestions

## Setup Instructions

### 1. Get Your Geoapify API Key
1. Visit [https://www.geoapify.com/](https://www.geoapify.com/)
2. Sign up for a free account
3. Navigate to your dashboard to get your API key
4. Free tier includes: **3,000 requests per day**

### 2. Configure Environment Variables
Create a `.env.local` file in your project root:

```bash
# Geoapify API Configuration
GEOAPIFY_API_KEY=your_actual_api_key_here

# Optional: Configure limits (defaults shown)
GEOAPIFY_AUTOCOMPLETE_LIMIT=10
GEOAPIFY_GEOCODING_LIMIT=5
```

### 3. Restart Your Development Server
```bash
npm run dev
```

## Features & Components

### 🔍 Enhanced Address Search API
**File**: `/src/app/api/address-search/route.ts`
- **Primary**: Geoapify autocomplete and geocoding
- **Fallback**: Nominatim (OpenStreetMap) when Geoapify unavailable
- **Smart routing**: Database properties + any real address

### 🎯 AddressAutocomplete Component
**File**: `/src/components/AddressAutocomplete.tsx`
- Real-time suggestions as you type
- Keyboard navigation (arrow keys, enter, escape)
- Loading indicators and error handling
- Click outside to close dropdown
- Professional styling with Tailwind CSS

### 📍 Updated Pages & Components
- **Hero Section** (`/`) - Main search with autocomplete
- **AVM Page** (`/avm`) - Property valuation with real addresses
- **Property Details** (`/property`) - Enhanced geocoding for maps

## API Endpoints

### Address Suggestions
```javascript
GET /api/address-search?q=123%20Main&suggestions=true
```

Response:
```json
{
  "suggestions": [
    {
      "fullAddress": "123 Main St, San Francisco, CA 94102, USA",
      "address": "123 Main St",
      "city": "San Francisco", 
      "state": "CA",
      "zip": "94102",
      "coordinates": { "lat": 37.7749, "lng": -122.4194 }
    }
  ],
  "count": 1,
  "source": "geoapify"
}
```

### Address Validation
```javascript
GET /api/address-search?q=123%20Main%20St&validate=true
```

Response:
```json
{
  "query": "123 Main St",
  "found": 0,
  "properties": [],
  "database_match": false,
  "geocoding": {
    "lat": 37.7749,
    "lng": -122.4194,
    "formatted_address": "123 Main St, San Francisco, CA 94102, USA"
  },
  "validated": true
}
```

## Error Handling & Fallbacks

### No API Key
- Falls back to database-only suggestions
- Still provides search for properties in our database
- Console warning: "Geoapify API key not found"

### API Rate Limits
- Automatically falls back to Nominatim (free)
- Graceful degradation - no interruption to user experience

### Network Issues
- Shows loading state during requests
- Error handling with user-friendly messages
- Maintains existing functionality

## Benefits

### 🎯 **User Experience**
- Type "1600 Penn" → See "1600 Pennsylvania Ave, Washington, DC"
- No more manual typing of full addresses
- Professional autocomplete like Google Maps

### 🏠 **Property Coverage**
- **Before**: Only ~15 properties in database
- **After**: Every real address in the world searchable
- Off-market properties now discoverable

### 💼 **Professional Ready**
- Real estate agents can search any address
- Perfect for property research and analysis
- Stakeholder demos show real capabilities

### ⚡ **Performance**
- 300ms debounce to avoid excessive API calls
- Caching and intelligent fallbacks
- Sub-second response times

## Usage Examples

### Basic Autocomplete
```tsx
import AddressAutocomplete from '@/components/AddressAutocomplete';

function MyComponent() {
  const [address, setAddress] = useState('');
  
  return (
    <AddressAutocomplete
      value={address}
      onChange={setAddress}
      placeholder="Enter any address..."
      onAddressSelect={(suggestion) => {
        console.log('Selected:', suggestion.fullAddress);
        // Navigate to property details, etc.
      }}
    />
  );
}
```

### Advanced Usage
```tsx
<AddressAutocomplete
  value={address}
  onChange={setAddress}
  placeholder="Search properties or addresses..."
  className="text-lg py-3"
  disabled={loading}
  onAddressSelect={(suggestion) => {
    // Auto-fill form fields
    setCity(suggestion.city);
    setState(suggestion.state);
    setZip(suggestion.zip);
    
    // Get coordinates for map
    if (suggestion.coordinates) {
      setMapCenter(suggestion.coordinates);
    }
  }}
/>
```

## Monitoring & Analytics

### Check API Usage
Monitor your Geoapify dashboard for:
- Daily request count
- Response times
- Error rates
- Geographic distribution

### Console Logs
Development mode shows:
```
"Geoapify autocomplete failed, falling back to database suggestions"
"Using Geoapify for address suggestions"
"Geocoding using enhanced API (Geoapify + Nominatim)"
```

## Troubleshooting

### Common Issues

**No suggestions appearing**:
1. Check API key in `.env.local`
2. Verify internet connection
3. Check browser console for errors

**"API key not found" warning**:
1. Ensure `.env.local` exists in project root
2. Restart development server after adding key
3. Check key name: `GEOAPIFY_API_KEY`

**Rate limit exceeded**:
1. Monitor usage in Geoapify dashboard
2. Consider upgrading plan for production
3. System automatically falls back to free alternatives

## Production Deployment

### Environment Variables
Set in your hosting platform (Vercel, Netlify, etc.):
```
GEOAPIFY_API_KEY=your_production_api_key
```

### Performance Optimization
- Consider upgrading Geoapify plan for higher limits
- Monitor response times and error rates
- Set up alerts for API failures

---

## 🚀 Ready to Use!

Your HOUSE/MAX platform now supports searching **any real address in the world** with professional-grade autocomplete functionality. Perfect for real estate professionals and property research! 

**Try it**: Start typing any address on the home page or AVM page to see the magic! ✨ 