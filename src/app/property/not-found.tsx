"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PropertyNotFoundContent() {
  const searchParams = useSearchParams();
  const paramsString = searchParams ? searchParams.toString() : "";
  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>Property Not Found</h1>
      <p>Sorry, we couldn&apos;t find that property.</p>
      {paramsString && (
        <div style={{ marginTop: 16, color: '#888', fontSize: 14 }}>
          <strong>URL Parameters:</strong> {paramsString}
        </div>
      )}
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