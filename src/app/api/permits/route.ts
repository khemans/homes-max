import { NextRequest, NextResponse } from 'next/server';

// Mock permit data with Denver metro area properties
const mockPermitData = [
  // Original properties
  {
    address: "123 Main St",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Roof Replacement", year: 2021, status: "Approved", permitId: "PRM-001" },
      { type: "Water Heater", year: 2019, status: "Finaled", permitId: "PRM-002" },
    ],
  },
  {
    address: "456 Oak Ave",
    city: "Aurora",
    state: "CO",
    zip: "80012",
    permits: [
      { type: "Solar Panel Install", year: 2022, status: "In Review", permitId: "PRM-101" },
      { type: "Kitchen Remodel", year: 2020, status: "Approved", permitId: "PRM-102" },
    ],
  },
  // Denver metro area properties
  {
    address: "1234 Larimer St",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Electrical Upgrade", year: 2023, status: "Finaled", permitId: "PRM-2001" },
      { type: "HVAC Replacement", year: 2022, status: "Approved", permitId: "PRM-2002" },
    ],
  },
  {
    address: "5678 Colfax Ave",
    city: "Lakewood",
    state: "CO",
    zip: "80214",
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "In Review", permitId: "PRM-2003" },
      { type: "Bathroom Addition", year: 2021, status: "Finaled", permitId: "PRM-2004" },
    ],
  },
  {
    address: "9012 Broadway",
    city: "Englewood",
    state: "CO",
    zip: "80113",
    permits: [
      { type: "Solar Panel Install", year: 2023, status: "Approved", permitId: "PRM-2005" },
      { type: "Deck Construction", year: 2022, status: "Finaled", permitId: "PRM-2006" },
      { type: "Garage Conversion", year: 2021, status: "Finaled", permitId: "PRM-2007" },
    ],
  },
  {
    address: "3456 Speer Blvd",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Roof Replacement", year: 2023, status: "In Review", permitId: "PRM-2008" },
    ],
  },
  {
    address: "7890 Alameda Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Basement Finish", year: 2023, status: "Approved", permitId: "PRM-2009" },
      { type: "Electrical Panel", year: 2022, status: "Finaled", permitId: "PRM-2010" },
    ],
  },
  {
    address: "2345 Colorado Blvd",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "Finaled", permitId: "PRM-2011" },
      { type: "Water Heater", year: 2021, status: "Approved", permitId: "PRM-2012" },
    ],
  },
  {
    address: "6789 Evans Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "HVAC Replacement", year: 2023, status: "In Review", permitId: "PRM-2013" },
    ],
  },
  {
    address: "1122 Hampden Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Addition - Master Suite", year: 2023, status: "Approved", permitId: "PRM-2014" },
      { type: "Solar Panel Install", year: 2022, status: "Finaled", permitId: "PRM-2015" },
      { type: "Kitchen Remodel", year: 2021, status: "Finaled", permitId: "PRM-2016" },
    ],
  },
  {
    address: "3344 Mississippi Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Bathroom Remodel", year: 2023, status: "In Review", permitId: "PRM-2017" },
      { type: "Electrical Upgrade", year: 2022, status: "Approved", permitId: "PRM-2018" },
    ],
  },
  {
    address: "5566 Yale Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Deck Construction", year: 2023, status: "Finaled", permitId: "PRM-2019" },
      { type: "Roof Replacement", year: 2022, status: "Approved", permitId: "PRM-2020" },
    ],
  },
  {
    address: "7788 Iliff Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "In Review", permitId: "PRM-2021" },
    ],
  },
  {
    address: "9900 Parker Rd",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Basement Finish", year: 2023, status: "Approved", permitId: "PRM-2022" },
      { type: "Garage Addition", year: 2022, status: "Finaled", permitId: "PRM-2023" },
      { type: "Solar Panel Install", year: 2021, status: "Finaled", permitId: "PRM-2024" },
    ],
  },
  {
    address: "1111 Arapahoe Rd",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Addition - Second Story", year: 2023, status: "In Review", permitId: "PRM-2025" },
      { type: "Kitchen Remodel", year: 2022, status: "Approved", permitId: "PRM-2026" },
      { type: "HVAC Replacement", year: 2021, status: "Finaled", permitId: "PRM-2027" },
    ],
  },
  {
    address: "2222 Belleview Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Bathroom Addition", year: 2023, status: "Approved", permitId: "PRM-2028" },
      { type: "Electrical Panel", year: 2022, status: "Finaled", permitId: "PRM-2029" },
    ],
  },
  {
    address: "3333 Dartmouth Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "Finaled", permitId: "PRM-2030" },
      { type: "Deck Construction", year: 2022, status: "Approved", permitId: "PRM-2031" },
    ],
  },
  {
    address: "4444 Evans Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Water Heater", year: 2023, status: "In Review", permitId: "PRM-2032" },
    ],
  },
  {
    address: "5555 Florida Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Roof Replacement", year: 2023, status: "Approved", permitId: "PRM-2033" },
      { type: "Electrical Upgrade", year: 2022, status: "Finaled", permitId: "PRM-2034" },
    ],
  },
  {
    address: "6666 Girard Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Basement Finish", year: 2023, status: "In Review", permitId: "PRM-2035" },
      { type: "Kitchen Remodel", year: 2022, status: "Approved", permitId: "PRM-2036" },
      { type: "Solar Panel Install", year: 2021, status: "Finaled", permitId: "PRM-2037" },
    ],
  },
  {
    address: "7777 Holly St",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Bathroom Remodel", year: 2023, status: "Approved", permitId: "PRM-2038" },
      { type: "HVAC Replacement", year: 2022, status: "Finaled", permitId: "PRM-2039" },
    ],
  },
  {
    address: "8888 Jewell Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Addition - Master Suite", year: 2023, status: "In Review", permitId: "PRM-2040" },
      { type: "Deck Construction", year: 2022, status: "Approved", permitId: "PRM-2041" },
    ],
  },
  {
    address: "9999 Kentucky Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "Finaled", permitId: "PRM-2042" },
    ],
  },
  {
    address: "1111 Leetsdale Dr",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Garage Conversion", year: 2023, status: "Approved", permitId: "PRM-2043" },
      { type: "Solar Panel Install", year: 2022, status: "Finaled", permitId: "PRM-2044" },
      { type: "Electrical Panel", year: 2021, status: "Finaled", permitId: "PRM-2045" },
    ],
  },
  {
    address: "2222 Monaco Pkwy",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Roof Replacement", year: 2023, status: "In Review", permitId: "PRM-2046" },
      { type: "Kitchen Remodel", year: 2022, status: "Approved", permitId: "PRM-2047" },
    ],
  },
  {
    address: "3333 Oneida St",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Water Heater", year: 2023, status: "Approved", permitId: "PRM-2048" },
    ],
  },
  {
    address: "4444 Quebec St",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Basement Finish", year: 2023, status: "Finaled", permitId: "PRM-2049" },
      { type: "Bathroom Addition", year: 2022, status: "Approved", permitId: "PRM-2050" },
      { type: "HVAC Replacement", year: 2021, status: "Finaled", permitId: "PRM-2051" },
    ],
  },
  {
    address: "5555 Rampart Way",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Addition - Second Story", year: 2023, status: "In Review", permitId: "PRM-2052" },
      { type: "Kitchen Remodel", year: 2022, status: "Approved", permitId: "PRM-2053" },
      { type: "Solar Panel Install", year: 2021, status: "Finaled", permitId: "PRM-2054" },
    ],
  },
  {
    address: "6666 Sheridan Blvd",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Deck Construction", year: 2023, status: "Approved", permitId: "PRM-2055" },
      { type: "Electrical Upgrade", year: 2022, status: "Finaled", permitId: "PRM-2056" },
    ],
  },
  {
    address: "7777 Tamarac Dr",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "In Review", permitId: "PRM-2057" },
      { type: "Roof Replacement", year: 2022, status: "Approved", permitId: "PRM-2058" },
    ],
  },
  {
    address: "8888 Union Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Basement Finish", year: 2023, status: "Finaled", permitId: "PRM-2059" },
      { type: "Garage Addition", year: 2022, status: "Approved", permitId: "PRM-2060" },
    ],
  },
  {
    address: "9999 Wadsworth Blvd",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Addition - Master Suite", year: 2023, status: "In Review", permitId: "PRM-2061" },
      { type: "Kitchen Remodel", year: 2022, status: "Approved", permitId: "PRM-2062" },
      { type: "Solar Panel Install", year: 2021, status: "Finaled", permitId: "PRM-2063" },
    ],
  },
  {
    address: "1111 Zuni St",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Bathroom Remodel", year: 2023, status: "Approved", permitId: "PRM-2064" },
    ],
  },
  {
    address: "2222 1st Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "HVAC Replacement", year: 2023, status: "In Review", permitId: "PRM-2065" },
      { type: "Electrical Panel", year: 2022, status: "Finaled", permitId: "PRM-2066" },
    ],
  },
  {
    address: "3333 2nd Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "Finaled", permitId: "PRM-2067" },
      { type: "Deck Construction", year: 2022, status: "Approved", permitId: "PRM-2068" },
      { type: "Water Heater", year: 2021, status: "Finaled", permitId: "PRM-2069" },
    ],
  },
  {
    address: "4444 3rd Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Roof Replacement", year: 2023, status: "Approved", permitId: "PRM-2070" },
    ],
  },
  {
    address: "5555 4th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Basement Finish", year: 2023, status: "In Review", permitId: "PRM-2071" },
      { type: "Electrical Upgrade", year: 2022, status: "Approved", permitId: "PRM-2072" },
    ],
  },
  {
    address: "6666 5th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Addition - Second Story", year: 2023, status: "Finaled", permitId: "PRM-2073" },
      { type: "Kitchen Remodel", year: 2022, status: "Approved", permitId: "PRM-2074" },
      { type: "Solar Panel Install", year: 2021, status: "Finaled", permitId: "PRM-2075" },
    ],
  },
  {
    address: "7777 6th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Bathroom Addition", year: 2023, status: "In Review", permitId: "PRM-2076" },
      { type: "HVAC Replacement", year: 2022, status: "Approved", permitId: "PRM-2077" },
    ],
  },
  {
    address: "8888 7th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "Finaled", permitId: "PRM-2078" },
      { type: "Garage Conversion", year: 2022, status: "Approved", permitId: "PRM-2079" },
    ],
  },
  {
    address: "9999 8th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Basement Finish", year: 2023, status: "In Review", permitId: "PRM-2080" },
      { type: "Deck Construction", year: 2022, status: "Approved", permitId: "PRM-2081" },
      { type: "Electrical Panel", year: 2021, status: "Finaled", permitId: "PRM-2082" },
    ],
  },
  {
    address: "1111 9th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Roof Replacement", year: 2023, status: "Approved", permitId: "PRM-2083" },
      { type: "Kitchen Remodel", year: 2022, status: "Finaled", permitId: "PRM-2084" },
    ],
  },
  {
    address: "2222 10th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Water Heater", year: 2023, status: "In Review", permitId: "PRM-2085" },
    ],
  },
  {
    address: "3333 11th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Addition - Master Suite", year: 2023, status: "Finaled", permitId: "PRM-2086" },
      { type: "Solar Panel Install", year: 2022, status: "Approved", permitId: "PRM-2087" },
      { type: "HVAC Replacement", year: 2021, status: "Finaled", permitId: "PRM-2088" },
    ],
  },
  {
    address: "4444 12th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Garage Addition", year: 2023, status: "In Review", permitId: "PRM-2089" },
      { type: "Kitchen Remodel", year: 2022, status: "Approved", permitId: "PRM-2090" },
      { type: "Bathroom Addition", year: 2021, status: "Finaled", permitId: "PRM-2091" },
    ],
  },
  {
    address: "5555 13th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Basement Finish", year: 2023, status: "Approved", permitId: "PRM-2092" },
      { type: "Electrical Upgrade", year: 2022, status: "Finaled", permitId: "PRM-2093" },
    ],
  },
  {
    address: "6666 14th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "In Review", permitId: "PRM-2094" },
      { type: "Deck Construction", year: 2022, status: "Approved", permitId: "PRM-2095" },
    ],
  },
  {
    address: "7777 15th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Roof Replacement", year: 2023, status: "Finaled", permitId: "PRM-2096" },
    ],
  },
  {
    address: "8888 16th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Solar Panel Install", year: 2023, status: "Approved", permitId: "PRM-2097" },
      { type: "Kitchen Remodel", year: 2022, status: "Finaled", permitId: "PRM-2098" },
    ],
  },
  {
    address: "9999 17th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Addition - Second Story", year: 2023, status: "In Review", permitId: "PRM-2099" },
      { type: "Bathroom Remodel", year: 2022, status: "Approved", permitId: "PRM-2100" },
      { type: "Electrical Panel", year: 2021, status: "Finaled", permitId: "PRM-2101" },
    ],
  },
  {
    address: "1111 18th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "HVAC Replacement", year: 2023, status: "Finaled", permitId: "PRM-2102" },
      { type: "Garage Conversion", year: 2022, status: "Approved", permitId: "PRM-2103" },
    ],
  },
  {
    address: "2222 19th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Kitchen Remodel", year: 2023, status: "In Review", permitId: "PRM-2104" },
      { type: "Basement Finish", year: 2022, status: "Approved", permitId: "PRM-2105" },
    ],
  },
  {
    address: "3333 20th Ave",
    city: "Denver",
    state: "CO",
    zip: "80202",
    permits: [
      { type: "Addition - Master Suite", year: 2023, status: "Finaled", permitId: "PRM-2106" },
      { type: "Solar Panel Install", year: 2022, status: "Approved", permitId: "PRM-2107" },
      { type: "Deck Construction", year: 2021, status: "Finaled", permitId: "PRM-2108" },
    ],
  },
];

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address')?.toLowerCase() || "";

  // Simulate search by address (now checks all address fields)
  const result = mockPermitData.find((item) =>
    `${item.address}, ${item.city}, ${item.state} ${item.zip}`.toLowerCase().includes(address)
  );

  return NextResponse.json({ permits: result ? result.permits : [] });
} 