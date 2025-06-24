"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface PropertyMapProps {
  lat?: number;
  lng?: number;
  address?: string;
}

const DEFAULT_POSITION = { lat: 37.7749, lng: -122.4194 }; // San Francisco as fallback

// Custom Marker component that handles icon setup
const CustomMarker: React.FC<{ position: [number, number]; address?: string }> = ({ position, address }) => {
  const [icon, setIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    import("leaflet").then((L) => {
      const customIcon = new L.default.Icon({
        iconUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEM1LjU5NiAwIDAgNS41OTYgMCAxMi41QzAgMTkuNDA0IDUuNTk2IDI1IDEyLjUgMjVDMTkuNDA0IDI1IDI1IDE5LjQwNCAyNSAxMi41QzI1IDUuNTk2IDE5LjQwNCAwIDEyLjUgMFoiIGZpbGw9IiMyNjc4RjMiLz4KPHBhdGggZD0iTTEyLjUgNkM4LjM2NCA2IDUgOS4zNjQgNSAxMy41QzUgMTcuNjM2IDguMzY0IDIxIDEyLjUgMjFDMTYuNjM2IDIxIDIwIDE3LjYzNiAyMCAxMy41QzIwIDkuMzY0IDE2LjYzNiA2IDEyLjUgNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAuNSIgY3k9IjIwLjUiIHI9IjE4IiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPC9zdmc+Cg==",
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
      });
      setIcon(customIcon);
    });
  }, []);

  if (!icon) return null;

  return (
    <Marker position={position} icon={icon}>
      <Popup>{address || "Property Location"}</Popup>
    </Marker>
  );
};

const PropertyMap: React.FC<PropertyMapProps> = ({ lat, lng, address }) => {
  const position = lat && lng ? { lat, lng } : DEFAULT_POSITION;

  return (
    <div className="w-full h-72 rounded-xl overflow-hidden shadow mb-8 z-0" style={{ zIndex: 0 }}>
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%", zIndex: 0 }}>
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