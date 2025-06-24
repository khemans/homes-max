import { NextRequest, NextResponse } from 'next/server';

// Mock permit data
const mockPermitData = [
  {
    address: "123 Main St",
    permits: [
      { type: "Roof Replacement", year: 2021, status: "Approved", permitId: "PRM-001" },
      { type: "Water Heater", year: 2019, status: "Finaled", permitId: "PRM-002" },
    ],
  },
  {
    address: "456 Oak Ave",
    permits: [
      { type: "Solar Panel Install", year: 2022, status: "In Review", permitId: "PRM-101" },
      { type: "Kitchen Remodel", year: 2020, status: "Approved", permitId: "PRM-102" },
    ],
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address')?.toLowerCase() || "";

  // Simulate search by address
  const result = mockPermitData.find((item) =>
    item.address.toLowerCase().includes(address)
  );

  return NextResponse.json({ permits: result ? result.permits : [] });
} 