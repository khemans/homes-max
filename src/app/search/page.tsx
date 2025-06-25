"use client";
import React, { Suspense } from "react";
import SearchResultsClient from "../../components/SearchResultsClient";

export default function SearchPage() {
  return (
    <Suspense>
      <SearchResultsClient />
    </Suspense>
  );
} 