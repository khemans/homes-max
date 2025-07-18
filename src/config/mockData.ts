import { Coordinates } from '@/types/property';

// Mock coordinates for known addresses
export const MOCK_COORDINATES: Record<string, Coordinates> = {
  '123 main st': { lat: 37.779, lng: -122.4194 },
  '456 oak ave': { lat: 37.781, lng: -122.417 },
  
  // Denver metro area coordinates
  '1234 larimer st': { lat: 39.7505, lng: -104.9963 },
  '5678 colfax ave': { lat: 39.7402, lng: -104.9847 },
  '9012 broadway': { lat: 39.7213, lng: -104.9877 },
  '3456 speer blvd': { lat: 39.7325, lng: -105.0087 },
  '7890 alameda ave': { lat: 39.7156, lng: -104.9876 },
  '2345 colorado blvd': { lat: 39.7234, lng: -104.9456 },
  '6789 evans ave': { lat: 39.6789, lng: -104.9876 },
  '1122 hampden ave': { lat: 39.6543, lng: -104.9876 },
  '3344 mississippi ave': { lat: 39.7234, lng: -104.9234 },
  '5566 yale ave': { lat: 39.7123, lng: -104.9345 }
};

// Helper function to get mock coordinates
export const getMockCoords = (address: string): Coordinates | null => {
  if (!address) return null;
  const lower = address.toLowerCase();
  return MOCK_COORDINATES[lower] || null;
};

// Info sections for property research guidance
export const INFO_SECTIONS = [
  {
    icon: "📄",
    title: "Permit Pages",
    keyword: ["permit", "permits", "building", "code"],
    content: {
      title: "How to find building permits:",
      steps: [
        "Identify your local county/city planning department.",
        "Visit their official website (search for \"[Your County Name] building permits\").",
        "Use their property search tool.",
        "Look for 'building permits' or 'code enforcement records'."
      ],
      note: "We'll provide curated links here in the future!"
    }
  },
  {
    icon: "🔑",
    title: "Property Rights Chapter",
    keyword: ["right", "rights", "mineral", "water", "air", "easement"],
    content: {
      title: "What are property rights?",
      items: [
        { term: "Mineral rights", definition: "Ownership of resources below the surface." },
        { term: "Water rights", definition: "Rights to use water sources on/under the property." },
        { term: "Air rights", definition: "Rights to use/control the space above the property." },
        { term: "Easements", definition: "Legal rights for others to use part of your property (e.g., utility lines)." }
      ],
      note: "Check your property deed or county records for details."
    }
  }
];

// Utility to get relevant info sections based on keywords
export const getRelevantInfoSections = (keywords: string[]) => {
  return INFO_SECTIONS.filter(section => 
    section.keyword.some(k => keywords.includes(k))
  );
}; 