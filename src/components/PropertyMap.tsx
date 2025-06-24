"use client";
import React, { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface PropertyMapProps {
  lat?: number;
  lng?: number;
  address?: string;
}

const DEFAULT_POSITION = { lat: 37.7749, lng: -122.4194 }; // San Francisco as fallback

const PropertyMap: React.FC<PropertyMapProps> = ({ lat, lng, address }) => {
  const position = lat && lng ? { lat, lng } : DEFAULT_POSITION;

  useEffect(() => {
    // Fix default marker icon issue in Leaflet with Webpack - only run on client
    import("leaflet").then((L) => {
      // Create a custom icon that doesn't rely on external files
      const customIcon = new L.default.Icon({
        iconUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjUiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCAyNSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyLjUgMEM1LjU5NiAwIDAgNS41OTYgMCAxMi41QzAgMTkuNDA0IDUuNTk2IDI1IDEyLjUgMjVDMTkuNDA0IDI1IDI1IDE5LjQwNCAyNSAxMi41QzI1IDUuNTk2IDE5LjQwNCAwIDEyLjUgMFoiIGZpbGw9IiMyNjc4RjMiLz4KPHBhdGggZD0iTTEyLjUgNkM4LjM2NCA2IDUgOS4zNjQgNSAxMy41QzUgMTcuNjM2IDguMzY0IDIxIDEyLjUgMjFDMTYuNjM2IDIxIDIwIDE3LjYzNiAyMCAxMy41QzIwIDkuMzY0IDE2LjYzNiA2IDEyLjUgNloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDEiIGhlaWdodD0iNDEiIHZpZXdCb3g9IjAgMCA0MSA0MSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAuNSIgY3k9IjIwLjUiIHI9IjE4IiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjIiLz4KPC9zdmc+Cg==",
        shadowSize: [41, 41],
        shadowAnchor: [12, 41],
      });
      
      // Override the default icon
      L.default.Marker.prototype.options.icon = customIcon;
    });
  }, []);

  return (
    <div className="w-full h-72 rounded-xl overflow-hidden shadow mb-8">
      <MapContainer center={position} zoom={15} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>{address || "Property Location"}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap; 