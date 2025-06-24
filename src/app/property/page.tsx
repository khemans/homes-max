import React, { Suspense } from "react";
import dynamic from "next/dynamic";

const PropertyDetailsClient = dynamic(() => import("../../components/PropertyDetailsClient"), { ssr: false });

export default function PropertyPage() {
  return (
    <Suspense fallback={<div>Loading property details...</div>}>
      <PropertyDetailsClient />
    </Suspense>
  );
} 