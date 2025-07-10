export interface ResourceItem {
  name: string;
  url: string;
  description: string;
  category: string;
  isActive?: boolean;
}

export const resources: ResourceItem[] = [
    {
    name: "Cotality Property Risk Reports",
    url: "https://www.cotality.com/products/underwriting-center",
    description: "Comprehensive property risk assessments including flood, fire, and earthquake data",
    category: "Risk Assessment",
    isActive: true
  },
  { 
    name: "LexisNexis C.L.U.E.® Property", 
    url: "https://risk.lexisnexis.com/products/clue-property",
    description: "Professional property loss history reports from LexisNexis with detailed claim information, dates, causes, and amounts paid from 90% of insurers",
    category: "Insurance",
    isActive: true
  },
  { 
    name: "Building Permit Research Guide", 
    url: "#",
    description: "Step-by-step guide to researching building permits and code compliance",
    category: "Permits",
    isActive: false
  },
  { 
    name: "Electrical Permit Database", 
    url: "#",
    description: "Access electrical permit records and inspection history for properties",
    category: "Permits",
    isActive: false
  },
  { 
    name: "Plumbing Permit Database", 
    url: "#",
    description: "Research plumbing permits, inspections, and code compliance records",
    category: "Permits",
    isActive: false
  },
  { 
    name: "Property Rights Handbook", 
    url: "#",
    description: "Understanding mineral rights, easements, and property boundaries",
    category: "Legal",
    isActive: false
  },
  { 
    name: "MLS Data Access", 
    url: "#",
    description: "Access to comprehensive Multiple Listing Service data",
    category: "Market Data",
    isActive: false
  },
  { 
    name: "Automated Valuation Model (AVM)", 
    url: "/avm",
    description: "AI-powered property valuation estimates using comparable sales, market trends, and property characteristics",
    category: "Market Data",
    isActive: true
  }
];

export const categories = ["All", "Risk Assessment", "Permits", "Legal", "Insurance", "Market Data"];

export const getActiveResources = () => resources.filter(r => r.isActive);
export const getResourcesByCategory = (category: string) => 
  category === "All" ? resources : resources.filter(r => r.category === category); 