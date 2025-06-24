"use client";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Fix default marker icon issue in Leaflet with Webpack
import L from "leaflet";
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface PropertyMapProps {
  lat?: number;
  lng?: number;
  address?: string;
}

const DEFAULT_POSITION = { lat: 37.7749, lng: -122.4194 }; // San Francisco as fallback

const PropertyMap: React.FC<PropertyMapProps> = ({ lat, lng, address }) => {
  const position = lat && lng ? { lat, lng } : DEFAULT_POSITION;
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