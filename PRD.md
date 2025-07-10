# Product Requirements Document: HOUSE/MAX

**Version:** 3.1  
**Date:** January 2025  
**Author:** AI Assistant (with User Collaboration)  
**Product Name:** HOUSE/MAX  
**Current Status:** MVP Deployed on Vercel with RE/MAX Professional Design

---

## 1. Introduction

"HOUSE/MAX" is a Next.js web application that empowers homebuyers with comprehensive property insights before they buy. By providing access to property history, risk assessments, permit records, and expert guidance, the application helps users make informed decisions with confidence. The platform features a professional RE/MAX-inspired design that establishes trust and credibility in the real estate market.

**Current Implementation:** Fully functional MVP deployed on Vercel with professional RE/MAX design system, search functionality, interactive maps, risk assessments, and comprehensive property data integrated with Cotality risk analytics.

**Recent Updates (v3.1):**
- Complete migration from CoreLogic to Cotality for risk assessment data
- Updated all branding and references to reflect Cotality's new identity
- Enhanced data integration with Cotality's "Intelligence Beyond Bounds" platform
- Improved risk assessment display with new Cotality branding

---

## 2. Goals & Objectives

**Primary Goal:**  
Empower homebuyers with comprehensive property insights and risk assessments, providing the MAX on their home before they buy.

**Key Objectives:**
- Provide comprehensive property history and risk assessment data through Cotality integration
- Offer professional-grade property research tools and resources
- Deliver expert guidance on permits, property rights, and legal considerations
- Maintain a professional, trustworthy user experience with RE/MAX design standards
- Utilize modern web technologies for efficient development and superior performance
- Leverage Cotality's advanced property data and analytics capabilities

---

## 3. Target Audience

- **Primary Users:**
  - Prospective Homebuyers (first-time and experienced)
  - Real Estate Agents and Professionals
  - Property Investors and Researchers
- **Secondary Users:**
  - Insurance Professionals
  - Legal Professionals working in real estate
  - Property Inspectors and Appraisers
  - Mortgage Lenders and Brokers

---

## 4. User Stories (Implemented)

- ✅ As a homebuyer, I want to access comprehensive property data including Cotality risk assessments and permit history
- ✅ As a homebuyer, I want to understand property rights, easements, and legal considerations in clear terms
- ✅ As a homebuyer, I want to research building permits and code compliance records
- ✅ As a homebuyer, I want to save properties for future reference and comparison
- ✅ As a homebuyer, I want to generate printable property reports for my records
- ✅ As a real estate professional, I want access to comprehensive property data to better serve my clients
- ✅ As a user, I want a professional, trustworthy platform that instills confidence
- ✅ As a user, I want to access Cotality's advanced risk analytics and property intelligence
- ✅ As a user, I want detailed wildfire, flood, and earthquake risk assessments for properties

---

## 5. Features & Functionality (Implemented)

### 5.1. Home Page / Entry Point ✅

- **Design:** Professional RE/MAX-inspired design with clean, modern aesthetics
- **Hero Section:**
  - Headline: "Find Your Dream Home with HOUSE/MAX"
  - Sub-headline: "Get the MAX on your home before you buy. Research property history, permits, and risk data with confidence."
  - Professional Search Bar: Large, prominent input field for property searches
  - Trust Indicators: Three professional feature highlights with icons
- **"What You'll Discover" Section:**
  - Three professional feature cards: "Permit History," "Risk Assessment," "Property Rights"
  - Professional icons and clear descriptions
  - Call-to-action button for property search

### 5.2. Property Details Page ✅

- **Professional Layout:** Clean card-based design with RE/MAX styling
- **Comprehensive Data Display:**
  - **Property Information:** Address, MLS data, and basic property details
  - **Interactive Map:** Leaflet map with custom RE/MAX balloon markers
  - **MLS Results:** Professional property listings with realtor insights
  - **Permit Records:** Comprehensive building permit history with status indicators
  - **Risk Assessment:** Detailed risk analysis powered by Cotality including:
    - Insurance claims history
    - Fire risk assessment
    - Flood risk evaluation
    - Cotality risk scores and analytics
    - Wildfire, flood, and earthquake risk ratings
    - Cotality Property ID integration
    - Direct links to Cotality reports
- **User Actions:** Save property functionality and printable report generation
- **Data Sources:** Clear attribution to Cotality for risk assessment data

### 5.3. Search Results Page ✅

- **Professional Grid Layout:** Clean property cards with comprehensive information
- **Advanced Filtering:** Search results with professional presentation
- **Interactive Map Integration:** Property locations with markers
- **Property Cards:** Professional design with pricing, specifications, and realtor insights

### 5.4. Secondary Pages ✅

**About Page:**
- Professional mission and vision presentation
- Comprehensive service offerings
- Trust-building content with professional design

**Resources Page:**
- Categorized resource library including Cotality Property Risk Reports
- Professional external links to industry tools
- Filterable resource categories
- Integration with Cotality's Intelligence Beyond Bounds platform

**My Properties Page:**
- Saved property management
- Professional property cards with management actions
- Empty state with clear call-to-actions

### 5.5. Navigation & Layout ✅

- **Professional Header:** Clean white design with RE/MAX branding
- **Mobile-Responsive Navigation:** Hamburger menu for mobile devices
- **Professional Footer:** Comprehensive site information and legal disclaimers
- **Consistent Branding:** RE/MAX colors and typography throughout

---

## 6. Design System (Implemented)

### 6.1. RE/MAX Brand Implementation ✅

- **Brand Colors:**
  - RE/MAX Red: `#DC1C2E` (primary actions, accents)
  - RE/MAX Blue: `#003DA5` (headings, secondary elements)
  - Professional grays and whites for backgrounds
- **Typography:** Inter font family with professional weight hierarchy
- **Logo Integration:** Custom RE/MAX balloon SVG with brand colors

### 6.2. Professional CSS Framework ✅

- **Component Classes:**
  - `.remax-heading-1/2/3` for consistent typography hierarchy
  - `.remax-btn-primary/secondary/outline` for professional buttons
  - `.remax-card` with professional shadows and hover effects
  - `.remax-input` for form styling
  - `.remax-container` for consistent layouts
- **Interactive Elements:** Hover effects, transitions, and professional animations
- **Responsive Design:** Mobile-first approach with professional breakpoints

---

## 7. Technical Architecture (Implemented)

### 7.1. Technology Stack

- **Frontend Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom RE/MAX design system
- **Typography:** Inter font family
- **Maps:** Leaflet with react-leaflet and custom markers
- **Geocoding:** Nominatim API
- **Data Integration:** Cotality API integration for risk assessment data
- **Deployment:** Vercel
- **Version Control:** Git with GitHub

### 7.2. Enhanced Project Structure

```
homes-max/
├── src/
│   ├── app/
│   │   ├── page.tsx (Home page)
│   │   ├── about/page.tsx (About page)
│   │   ├── resources/page.tsx (Resources page)
│   │   ├── my-properties/page.tsx (Saved properties)
│   │   ├── search/page.tsx (Search results)
│   │   ├── property/page.tsx (Property details)
│   │   ├── api/
│   │   │   ├── mls/route.ts (MLS API)
│   │   │   └── risk/route.ts (Cotality risk assessment API)
│   │   ├── globals.css (RE/MAX design system)
│   │   └── layout.tsx (Root layout with professional footer)
│   ├── components/
│   │   ├── Header.tsx (Professional navigation)
│   │   ├── HeroSection.tsx (Professional hero with trust indicators)
│   │   ├── PropertyDetailsClient.tsx (Comprehensive property data with Cotality integration)
│   │   ├── SearchResultsClient.tsx (Professional search results)
│   │   ├── PropertyMap.tsx (Custom RE/MAX markers)
│   │   └── WhatYoullDiscover.tsx (Professional feature cards)
│   ├── data/
│   │   └── resources.ts (Resource definitions including Cotality)
│   ├── utils/
│   │   └── resourceManager.ts (Resource management with Cotality integration)
│   └── types/
│       └── property.ts (TypeScript interfaces)
├── public/ (Static assets including RE/MAX branding)
└── package.json
```

### 7.3. Enhanced Components

- **Header:** Professional navigation with RE/MAX branding and mobile responsiveness
- **PropertyDetailsClient:** Comprehensive property data with Cotality risk assessments and professional styling
- **SearchResultsClient:** Professional search results with filtering and map integration
- **PropertyMap:** Custom RE/MAX balloon markers with professional popup design

### 7.4. API Routes

- **`/api/mls`:** Enhanced MLS data endpoint with comprehensive property information
- **`/api/risk`:** Cotality risk assessment data integration with comprehensive property risk analytics
- **Risk Data Integration:** Mock risk assessment data with realistic property insights powered by Cotality's data model

### 7.5. Data Integration

- **Cotality Integration:** Complete integration with Cotality's property risk assessment platform
- **Risk Assessment Data:**
  - Wildfire risk scores and analytics
  - Flood risk assessment and zone information
  - Earthquake risk evaluation
  - Property-specific risk identifiers
  - Direct links to Cotality reports
- **Resource Management:** Dynamic resource linking with Cotality Property Risk Reports

---

## 8. User Experience (UX) & Design (Enhanced)

- **Professional Aesthetics:** RE/MAX-inspired design with trust-building elements
- **Brand Consistency:** Consistent use of RE/MAX colors, typography, and styling
- **Navigation:** Intuitive professional navigation with clear information hierarchy
- **Accessibility:** Professional contrast ratios and semantic HTML structure
- **Performance:** Optimized loading states and error handling
- **Mobile Experience:** Fully responsive design with professional mobile interactions
- **Data Visualization:** Clear presentation of Cotality risk assessment data with professional charts and indicators

---

## 9. Current Implementation Status

### ✅ Completed Features (Version 3.1)

1. **Professional Design System**
   - Complete RE/MAX brand implementation
   - Professional CSS framework with reusable components
   - Consistent typography and color schemes
   - Professional interactive elements and animations

2. **Enhanced Home Page**
   - Professional hero section with trust indicators
   - RE/MAX branding integration
   - Professional feature cards
   - Clear call-to-action elements

3. **Comprehensive Property Details**
   - Professional layout with card-based design
   - Cotality risk assessment integration
   - Permit history with status indicators
   - MLS data with realtor insights
   - Save functionality and printable reports
   - Detailed risk analytics display

4. **Professional Navigation**
   - Clean header design with RE/MAX branding
   - Mobile-responsive navigation
   - Professional footer with comprehensive information

5. **Secondary Pages**
   - Professional About page with mission/vision
   - Resources page with categorized tools including Cotality integration
   - My Properties page with saved property management

6. **Enhanced User Experience**
   - Professional loading states
   - Error handling with professional messaging
   - Responsive design across all breakpoints
   - Trust-building design elements

7. **Cotality Integration (New in v3.1)**
   - Complete migration from CoreLogic to Cotality
   - Updated risk assessment data structure
   - Enhanced property risk analytics
   - Professional presentation of Cotality data
   - Direct integration with Cotality's "Intelligence Beyond Bounds" platform

### 🔄 Future Enhancements

- Real-time data integration with Cotality APIs
- Advanced risk assessment algorithms using Cotality's ML models
- User account system with enhanced property tracking
- Professional reporting and document generation
- Integration with real estate professional tools
- Advanced search and filtering capabilities
- Enhanced mobile app experience
- Integration with additional Cotality data sources

---

## 10. Success Metrics

- **User Trust:** Professional appearance metrics and user confidence surveys
- **Engagement:** Property searches, saved properties, and report generations
- **Professional Adoption:** Usage by real estate professionals
- **Technical Performance:** Page load times and user experience metrics
- **Brand Recognition:** Association with professional real estate services
- **Data Accuracy:** Quality of Cotality risk assessment data and user feedback
- **Conversion Rates:** Property research to real estate action conversion

---

## 11. Deployment & Infrastructure

### Current Deployment
- **Platform:** Vercel with optimized Next.js deployment
- **Domain:** Professional domain setup
- **Performance:** Optimized for speed and reliability
- **Security:** HTTPS encryption and secure data handling
- **API Integration:** Secure integration with Cotality data services

### Professional Standards
- **Accessibility:** WCAG compliance for professional accessibility
- **SEO:** Optimized for real estate search visibility
- **Analytics:** Professional user tracking and insights
- **Monitoring:** Performance monitoring and error tracking
- **Data Privacy:** Compliance with data protection regulations

---

## 12. Brand Guidelines

### Visual Identity
- **Logo Usage:** Consistent RE/MAX balloon branding
- **Color Palette:** Professional RE/MAX red and blue with supporting grays
- **Typography:** Inter font family for professional readability
- **Imagery:** Professional real estate photography and icons

### Voice & Tone
- **Professional:** Trustworthy and knowledgeable
- **Helpful:** Clear guidance and expert advice
- **Confident:** Authoritative real estate expertise
- **Accessible:** Complex information made understandable

### Data Presentation
- **Accuracy:** Precise presentation of Cotality risk data
- **Clarity:** Clear visualization of complex risk assessments
- **Transparency:** Open attribution to data sources
- **Professionalism:** Consistent with real estate industry standards

---

## 13. Compliance & Legal

- **Disclaimers:** Professional legal disclaimers for property information
- **Data Sources:** Clear attribution to data providers like Cotality
- **Privacy:** Professional privacy policy and data handling
- **Terms of Service:** Professional terms for platform usage
- **Data Accuracy:** Disclaimers about data accuracy and currency
- **Professional Use:** Guidelines for real estate professional usage

---

## 14. Data Sources & Integrations

### Primary Data Sources
- **Cotality:** Primary risk assessment and property intelligence provider
  - Wildfire, flood, and earthquake risk scores
  - Property-specific risk identifiers
  - Comprehensive risk analytics
  - Direct report access
- **MLS Data:** Property listings and market information
- **Public Records:** Permit and legal information
- **Geographic Data:** Location and mapping services

### API Integrations
- **Cotality API:** Risk assessment data integration
- **Nominatim API:** Geocoding and location services
- **Leaflet Maps:** Interactive mapping functionality

This document reflects the current state of HOUSE/MAX as a professional real estate property research platform with RE/MAX-inspired design, comprehensive functionality, and full integration with Cotality's advanced property risk assessment capabilities. 