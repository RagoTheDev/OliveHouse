import { MapContainer, TileLayer, Circle, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { approximateArea, property } from "@/data/property";
import { config } from "@/lib/config";

const pinIcon = L.divIcon({
  className: "",
  html: `<span style="display:block;width:18px;height:18px;border-radius:999px;background:#454d37;border:3px solid #f6f3eb;box-shadow:0 0 0 2px #454d37"></span>`,
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function LeafletMap() {
  const pin = config.mapPin;
  const center: [number, number] = pin ? [pin.lat, pin.lng] : [approximateArea.lat, approximateArea.lng];

  return (
    <MapContainer
      center={center}
      zoom={pin ? 15 : approximateArea.zoom}
      scrollWheelZoom={false}
      zoomControl={false}
      className="h-full w-full"
      attributionControl
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {pin ? (
        <Marker position={center} icon={pinIcon}>
          <Popup>{property.name}</Popup>
        </Marker>
      ) : (
        <Circle
          center={center}
          radius={approximateArea.radiusMeters}
          pathOptions={{ color: "#454d37", weight: 1.5, fillColor: "#a8b19a", fillOpacity: 0.3, dashArray: "6 6" }}
        >
          <Popup>{approximateArea.label} — approximate area</Popup>
        </Circle>
      )}
    </MapContainer>
  );
}
