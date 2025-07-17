import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: "API routes are working correctly",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    hasGeoapifyKey: !!process.env.GEOAPIFY_API_KEY,
    geoapifyKeyLength: process.env.GEOAPIFY_API_KEY ? process.env.GEOAPIFY_API_KEY.length : 0,
    url: req.url,
    method: req.method
  });
} 