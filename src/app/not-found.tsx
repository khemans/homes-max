"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function NotFoundContent() {
  const searchParams = useSearchParams();
  const paramsString = searchParams ? searchParams.toString() : "";
  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn&apos;t find that page.</p>
      {paramsString && (
        <div style={{ marginTop: 16, color: '#888', fontSize: 14 }}>
          <strong>URL Parameters:</strong> {paramsString}
        </div>
      )}
    </div>
  );
}

export default function NotFoundPage() {
  return (
    <Suspense>
      <NotFoundContent />
    </Suspense>
  );
} 