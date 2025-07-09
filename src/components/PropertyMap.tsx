"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import type { Icon } from "leaflet";

interface PropertyMapProps {
  lat?: number;
  lng?: number;
  address?: string;
}

const DEFAULT_POSITION = { lat: 37.7749, lng: -122.4194 }; // San Francisco as fallback

// Dynamically import react-leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Custom Marker component that handles icon setup
const CustomMarker: React.FC<{ position: [number, number]; address?: string }> = ({ position, address }) => {
  const [icon, setIcon] = useState<Icon | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    import("leaflet").then((L) => {
      // RE/MAX balloon pin SVG with distinct white band (matches header)
      const pinSVG = `
        <svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <ellipse cx="18" cy="46" rx="4" ry="2" fill="#888"/>
          <g>
            <path d="M18 4C8 4 2 14 2 22c0 10 8 18 16 18s16-8 16-18C34 14 28 4 18 4z" fill="#fff" stroke="#222" stroke-width="1.5"/>
            <path d="M18 4C8 4 2 14 2 16.5h32C34 14 28 4 18 4z" fill="#e31837"/>
            <path d="M2 27c2 7 8 13 16 13s14-6 16-13H2z" fill="#005ba6"/>
            <rect x="2" y="16.5" width="32" height="10.5" fill="#fff"/>
            <ellipse cx="18" cy="22" rx="16" ry="18" fill="none" stroke="#222" stroke-width="1.5"/>
          </g>
          <path d="M18 40v4" stroke="#222" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      `;
      const customIcon = new L.default.Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(pinSVG)}`,
        iconSize: [32, 48],
        iconAnchor: [16, 48],
        popupAnchor: [0, -48],
        shadowUrl: `data:image/svg+xml;base64,${btoa(`
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="20" cy="38" rx="12" ry="2" fill="rgba(0,0,0,0.4)"/>
          </svg>
        `)}`,
        shadowSize: [40, 40],
        shadowAnchor: [16, 40],
      });
      setIcon(customIcon);
    });
  }, [isClient]);

  if (!isClient || !icon) return null;

  return (
    <Marker position={position} icon={icon}>
      <Popup>{address || "Property Location"}</Popup>
    </Marker>
  );
};

const PropertyMap: React.FC<PropertyMapProps> = ({ lat, lng, address }) => {
  const [isClient, setIsClient] = useState(false);
  const position = lat && lng ? { lat, lng } : DEFAULT_POSITION;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="w-full h-72 rounded-xl overflow-hidden shadow mb-8 z-0 bg-gray-200 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  // Create a unique key based on coordinates to force re-render when location changes
  const mapKey = `${lat}-${lng}-${address}`;

  return (
    <div className="w-full h-72 rounded-xl overflow-hidden shadow mb-8 z-0" style={{ zIndex: 0 }}>
      <MapContainer 
        key={mapKey}
        center={position} 
        zoom={15} 
        scrollWheelZoom={false} 
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <CustomMarker position={[position.lat, position.lng]} address={address} />
      </MapContainer>
    </div>
  );
};

export default PropertyMap; 