import { NextRequest, NextResponse } from 'next/server';

// Mock MLS data
const mockMLSData = [
  {
    address: "123 Main St",
    price: "$500,000",
    beds: 3,
    baths: 2,
    sqft: 1800,
    status: "Active",
    mlsId: "MLS123456",
  },
  {
    address: "456 Oak Ave",
    price: "$750,000",
    beds: 4,
    baths: 3,
    sqft: 2500,
    status: "Pending",
    mlsId: "MLS654321",
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address')?.toLowerCase() || "";

  // Simulate search by address
  const result = mockMLSData.filter((item) =>
    item.address.toLowerCase().includes(address)
  );

  return NextResponse.json({ results: result });
} 