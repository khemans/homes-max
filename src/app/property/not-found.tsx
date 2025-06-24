"use client";
import { Suspense } from "react";

function PropertyNotFoundContent() {
  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Property Not Found</h1>
      <p>Sorry, we couldn't find that property.</p>
    </div>
  );
}

export default function PropertyNotFoundPage() {
  return (
    <Suspense>
      <PropertyNotFoundContent />
    </Suspense>
  );
} 