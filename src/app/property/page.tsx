import React, { Suspense } from "react";
import PropertyDetailsClient from "../../components/PropertyDetailsClient";

export default function PropertyPage() {
  return (
    <Suspense fallback={<div>Loading property details...</div>}>
      <PropertyDetailsClient />
    </Suspense>
  );
} 