# County Parcel Links Feature

## Overview

The HOUSE/MAX platform now includes dynamic links that provide direct access to official county parcel pages for each property. This feature eliminates the need for users to manually navigate through county websites to find property records.

## How It Works

### Automatic County Detection
The system automatically identifies the appropriate county based on the property's city and state, then generates a direct link to that county's official property records page.

### Supported Counties

#### Colorado
- **Denver**: City and County of Denver
- **Jefferson County**: Lakewood, Westminster  
- **Arapahoe County**: Aurora

#### California
- **Los Angeles County**: Los Angeles, Santa Monica, Beverly Hills, Pasadena
- **Orange County**: Anaheim, Irvine
- **San Diego County**: San Diego

#### Massachusetts
- **Suffolk County**: Boston
- **Middlesex County**: Cambridge, Somerville, Newton

#### Texas
- **Harris County**: Houston
- **Dallas County**: Dallas, Plano, Irving

#### Florida
- **Miami-Dade County**: Miami, Miami Beach
- **Broward County**: Fort Lauderdale, Hollywood

#### New York
- **New York County**: Manhattan
- **Kings County**: Brooklyn

### Link Types

1. **Direct Links** (Blue buttons): For supported counties, users get direct access to the official assessor portal with the property address pre-filled
2. **Search Links** (Gray buttons): For unsupported areas, users get a Google search targeting the appropriate county assessor records

## User Interface

### Property Detail Pages
- Each MLS listing card includes a "County Records" button in the bottom-right
- Hover tooltip shows the county name and any special instructions

### Search Results Pages  
- Each property card includes a "County" button in the action row
- Compact design maintains the existing layout

## Technical Implementation

### Core Functions

```typescript
generateParcelLink(property: PropertyLocation): ParcelLink
```
- Main function that generates appropriate links
- Returns structured data including URL, display text, and availability

```typescript
isParcelLinkAvailable(city: string, state: string): boolean
```
- Checks if direct county links are available for a location

### Configuration Structure

Each county has a configuration that includes:
- Official website base URL
- Search endpoint path
- Required parameters
- Search type (address/parcel/owner)
- Special instructions

### Example Generated URLs

**Denver Property:**
```
https://www.denvergov.org/property/assessor-real-property-search?address=4521+Broadway%2C+Denver%2C+CO+80216
```

**Los Angeles Property:**
```
https://portal.assessor.lacounty.gov/parceldetail?address=123+Main+St%2C+Los+Angeles%2C+CA+90210
```

## Benefits for Users

1. **Time Saving**: No need to manually search through county websites
2. **Accuracy**: Direct links ensure users reach the correct department
3. **Comprehensive**: Access to official tax records, assessments, and permits
4. **Universal**: Fallback search for any location not directly supported

## Future Enhancements

### Planned Additions
- More county configurations (Ohio, Illinois, Washington)
- Parcel ID-based direct linking where available
- Integration with additional property data sources
- Cached parcel information display

### Technical Roadmap
- API endpoint for county configuration management
- User feedback system for link accuracy
- Analytics tracking for most-used counties
- Mobile-optimized county pages

## Maintenance

### Adding New Counties
1. Research the county's official property search system
2. Add configuration to `COUNTY_CONFIGS` in `/src/utils/parcelLinks.ts`
3. Map cities to counties in `CITY_COUNTY_MAP`
4. Test the generated URLs with sample addresses
5. Update documentation

### Testing
- Verify links work correctly for each supported county
- Test fallback behavior for unsupported locations
- Ensure proper URL encoding for special characters
- Validate mobile responsiveness

## Support Notes

- Links open in new tabs to preserve user's research session
- All external links include proper security attributes
- Graceful fallback ensures no broken experiences
- Clear visual indicators distinguish direct vs. search links 