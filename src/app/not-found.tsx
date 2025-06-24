"use client";
import { Suspense } from "react";

function NotFoundContent() {
  // You can use useSearchParams() here if needed
  return (
    <div style={{ textAlign: "center", marginTop: 40 }}>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find that page.</p>
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