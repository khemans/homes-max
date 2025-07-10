import { ResourceItem } from "@/data/resources";

export interface LinkedResource {
  name: string;
  url: string;
  description: string;
  category: string;
  buttonText?: string;
}

// Helper function to create a resource entry from property details links
export const createResourceFromLink = (resource: LinkedResource): ResourceItem => ({
  name: resource.name,
  url: resource.url,
  description: resource.description,
  category: resource.category,
  isActive: true
});

// Function to get resources that are linked in property details
export const getLinkedResources = (): LinkedResource[] => [
  {
    name: "Cotality Property Risk Reports",
    url: "https://store.cotality.com/search",
    description: "Comprehensive property risk assessments including flood, fire, and earthquake data",
    category: "Risk Assessment",
    buttonText: "View Cotality Report"
  },
  {
    name: "LexisNexis C.L.U.E.® Property",
    url: "https://risk.lexisnexis.com/products/clue-property", 
    description: "Access comprehensive property loss history reports with detailed information on date of loss, cause of loss, amounts paid, and more through LexisNexis C.L.U.E.® Property database",
    category: "Insurance",
    buttonText: "View C.L.U.E.® Property"
  },
  {
    name: "Automated Valuation Model (AVM)",
    url: "/avm",
    description: "AI-powered property valuation estimates using comparable sales, market trends, and property characteristics",
    category: "Market Data",
    buttonText: "Get Property Valuation"
  }
];

// Function to check if a resource is currently active/linked
export const isResourceLinked = (resourceName: string): boolean => {
  return getLinkedResources().some(r => r.name === resourceName);
};

// Function to get resource by name from linked resources
export const getLinkedResource = (resourceName: string): LinkedResource | undefined => {
  return getLinkedResources().find(r => r.name === resourceName);
};

// Function to add a new resource link (this would be used when adding resources to property details)
export const addResourceLink = (resource: LinkedResource): void => {
  // In a real implementation, this would update the resources array
  // For now, it's a placeholder that demonstrates the concept
  console.log(`Adding resource: ${resource.name} to linked resources`);
  
  // This would typically update the resources.ts file or a database
  // to mark the resource as active and include it in property details
};

// Function to remove a resource link
export const removeResourceLink = (resourceName: string): void => {
  console.log(`Removing resource: ${resourceName} from linked resources`);
  
  // This would typically update the resources.ts file or a database
  // to mark the resource as inactive
};

// Example of how to add a new resource programmatically
export const addNewResourceExample = () => {
  const newResource: LinkedResource = {
    name: "Example New Resource",
    url: "https://example.com/new-resource",
    description: "This is an example of how to add a new resource that will automatically appear in both property details and the resources page",
    category: "Market Data",
    buttonText: "Access New Resource"
  };
  
  addResourceLink(newResource);
}; 