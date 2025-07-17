# HOUSE/MAX - Property Intelligence Platform

**Version:** 3.4  
**Status:** Production-Ready Deployment  
**Live Site:** [https://house-max.vercel.app/](https://house-max.vercel.app/)

## 🏠 About HOUSE/MAX

HOUSE/MAX is a comprehensive Next.js web application that empowers homebuyers with detailed property insights before they buy. The platform provides access to property history, risk assessments, permit records, and expert guidance through a professional RE/MAX-inspired design that establishes trust and credibility in the real estate market.

## ✨ Key Features

- **🔍 Advanced Property Search** - Intelligent address autocomplete with Geoapify integration
- **📊 AVM v2.0 Valuations** - Multi-approach automated valuation model with 70-98% confidence scoring
- **🏛️ Public Records Integration** - Comprehensive government data using free APIs (US Census, FEMA, local databases)
- **⚠️ Risk Assessment** - Detailed wildfire, flood, and earthquake risk analysis powered by Cotality
- **🗺️ Interactive Maps** - Leaflet maps with custom RE/MAX balloon markers
- **📋 Building Permits** - Recent construction activity and permit history (consolidated in Public Records)
- **📄 Printable Reports** - Professional property reports with comprehensive public records data
- **💾 Save Functionality** - Save properties for future reference and comparison
- **📱 Responsive Design** - Professional UI optimized for all devices

## 🚀 Technology Stack

- **Framework:** Next.js 15.3.4 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom RE/MAX design system
- **Maps:** Leaflet with React-Leaflet
- **Deployment:** Vercel Platform
- **APIs:** Geoapify, Cotality, US Government APIs (Census, FEMA)

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- Geoapify API key (free tier: 3,000 requests/day)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd homes-max
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file:
   ```env
   GEOAPIFY_API_KEY=your_geoapify_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser:**
   Visit [http://localhost:3000](http://localhost:3000)

## 📚 Documentation

Comprehensive documentation is available through the footer navigation:

- **📋 [Product Requirements](./PRD.md)** - Complete feature specifications and technical details
- **🏛️ [Public Records Integration](./PUBLIC_RECORDS_INTEGRATION.md)** - Government data API integration guide
- **🔧 [Vercel Troubleshooting](./VERCEL_TROUBLESHOOTING.md)** - Deployment debugging and solutions
- **📊 [AVM v2.0 Documentation](./AVM_v2.0.md)** - Advanced property valuation algorithms
- **🗺️ [Geoapify Setup Guide](./GEOAPIFY_SETUP.md)** - Address search API configuration

## 🌐 Deployment

The application is deployed on Vercel with automatic CI/CD from GitHub:

- **Production:** [https://house-max.vercel.app/](https://house-max.vercel.app/)
- **Environment Variables:** Configure `GEOAPIFY_API_KEY` in Vercel dashboard
- **Monitoring:** Built-in debugging with `/api/test` endpoint

## 💰 Cost Efficiency

HOUSE/MAX leverages free government APIs to provide premium property insights:

- **Current Cost:** $0/month (using free APIs)
- **Premium Alternative:** $74+/month (CoreLogic, proprietary data)
- **Annual Savings:** $888+ compared to premium services

## 🔍 API Testing

Visit `/api/test` to verify:
- ✅ API routes functionality
- ✅ Environment variables configuration
- ✅ Geoapify API connectivity
- ✅ System health status

## 🚨 Troubleshooting

If you encounter issues:

1. **Check environment variables** - Ensure `GEOAPIFY_API_KEY` is set
2. **Verify API limits** - Free tier: 3,000 requests/day
3. **Review console logs** - Enhanced debugging in both client and server
4. **Test API endpoints** - Use `/api/test` for diagnostics
5. **Consult documentation** - See `VERCEL_TROUBLESHOOTING.md`

## 📈 Recent Updates (v3.4)

- ✅ **Data Consolidation:** Removed duplicate building permits section
- ✅ **Enhanced Printables:** Added comprehensive public records to printable reports
- ✅ **Production Debugging:** Advanced monitoring and troubleshooting tools
- ✅ **Documentation System:** Automatic .md file rendering with professional styling

## 🤝 Contributing

This project follows modern React and TypeScript best practices. When contributing:

- Use TypeScript for type safety
- Follow Tailwind CSS conventions
- Maintain responsive design principles
- Add comprehensive error handling
- Include proper documentation

## 📄 License

This project is part of the RE/MAX property intelligence ecosystem.

---

**Built with ❤️ using Next.js and modern web technologies**
