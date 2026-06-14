import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L  from "leaflet";
import type { LatLngExpression } from "leaflet";
import { useNavigate } from "react-router-dom";

import { PageWrapper } from "../components/PageWrapper";
import { Card } from "../components/Card";
import { Badge } from "../components/Badge";
import type { Severity } from "../components/Badge";

import {
  Activity,
  Radio,
  Filter,
  Target,
} from "lucide-react";

import API from "../services/api";

import "leaflet/dist/leaflet.css";

// Fix Leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom marker creator
const createCustomIcon = (
  color: string,
  glow: boolean = false
): L.DivIcon => {
  return L.divIcon({
    className: "custom-leaflet-icon",
    html: `
      <div style="
        background-color:${color};
        width:20px;
        height:20px;
        border-radius:50%;
        border:3px solid white;
        box-shadow:${
          glow
            ? `0 0 20px ${color}, 0 0 40px ${color}`
            : `0 0 10px ${color}`
        };
        ${glow ? "animation:pulse-slow 2s infinite;" : ""}
      ">
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
  });
};

const iconCritical = createCustomIcon("#EF4444", true);
const iconHigh = createCustomIcon("#F97316");
const iconMedium = createCustomIcon("#EAB308");
const iconLow = createCustomIcon("#22C55E");

interface Incident {
  _id: string;
  latitude: number;
  longitude: number;
  severity: Severity;
  type: string;
  priorityScore: number;
  description: string;
}

export const LiveMap: React.FC = () => {
  const navigate = useNavigate();

  const [incidents, setIncidents] = useState<Incident[]>([]);

  const fetchIncidents = async (): Promise<void> => {
    try {
      const res = await API.get("/incidents");

      const data: Incident[] = Array.isArray(res.data?.incidents)
        ? res.data.incidents
        : [];

      setIncidents(data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  const criticalCount = incidents.filter(
    (incident) => incident.severity === "Critical"
  ).length;

  const highCount = incidents.filter(
    (incident) => incident.severity === "High"
  ).length;

  const mediumCount = incidents.filter(
    (incident) => incident.severity === "Medium"
  ).length;

  const lowCount = incidents.filter(
    (incident) => incident.severity === "Low"
  ).length;

  const mapCenter: LatLngExpression = [28.6139, 77.209];

  return (
    <PageWrapper className="h-[calc(100vh-8rem)] flex flex-col relative z-0">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Target className="w-6 h-6 text-primary" />
          Live Operations Map
        </h1>

        <div className="flex gap-2">
          <button className="glass-button bg-background/50 border border-white/10 px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-white/5">
            <Radio className="w-4 h-4 text-primary" />
            Live Feed
          </button>

          <button className="glass-button bg-background/50 border border-white/10 p-2 rounded-lg hover:bg-white/5">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Card className="flex-1 p-0 overflow-hidden relative border border-white/10">
        {/* Status Panel */}
        <div className="absolute top-4 right-4 z-[400] w-64 space-y-2 pointer-events-none">
          <Card className="p-4 bg-background/80 backdrop-blur-xl border-white/10 shadow-2xl pointer-events-auto">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">
              Status Overview
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-critical">
                  <div className="w-2 h-2 rounded-full bg-critical shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                  Critical
                </span>
                <span className="font-mono font-bold">
                  {criticalCount}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-high">
                  <div className="w-2 h-2 rounded-full bg-high" />
                  High
                </span>
                <span className="font-mono font-bold">{highCount}</span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-medium">
                  <div className="w-2 h-2 rounded-full bg-medium" />
                  Medium
                </span>
                <span className="font-mono font-bold">
                  {mediumCount}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm">
                <span className="flex items-center gap-2 text-low">
                  <div className="w-2 h-2 rounded-full bg-low" />
                  Low
                </span>
                <span className="font-mono font-bold">{lowCount}</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-primary font-medium">
              <Activity className="w-3 h-3 animate-pulse" />
              Monitoring Active Incidents
            </div>
          </Card>
        </div>

        <MapContainer
          center={mapCenter}
          zoom={11}
          className="w-full h-full z-0"
          zoomControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution="&copy; OpenStreetMap contributors &copy; CARTO"
          />

          {incidents.map((incident) => {
            const position: LatLngExpression = [
              Number(incident.latitude),
              Number(incident.longitude),
            ];

            const markerIcon =
              incident.severity === "Critical"
                ? iconCritical
                : incident.severity === "High"
                ? iconHigh
                : incident.severity === "Medium"
                ? iconMedium
                : iconLow;

            return (
              <Marker
                key={incident._id}
                position={position}
                icon={markerIcon}
              >
                <Popup className="custom-popup">
                  <div className="bg-background border border-white/10 rounded-lg p-3 text-white min-w-[200px] shadow-2xl">
                    <div className="flex justify-between items-start mb-2">
                      <Badge
                        severity={incident.severity}
                        variant="solid"
                        className="text-[10px]"
                      />

                      <span className="text-xs font-mono text-gray-500">
                        #{incident._id?.slice(-6)}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm mb-1">
                      {incident.type} Emergency
                    </h4>

                    <div className="flex justify-between text-xs text-gray-400 mb-3">
                      <span>AI Score</span>

                      <span
                        className={
                          incident.severity === "Critical"
                            ? "text-critical font-bold"
                            : ""
                        }
                      >
                        {incident.priorityScore}/100
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/incident/${incident._id}`)
                      }
                      className="w-full bg-primary/20 text-primary py-1.5 rounded text-xs font-bold hover:bg-primary/30 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </Card>

      <style>{`
        .leaflet-popup-content-wrapper,
        .leaflet-popup-tip {
          background-color: transparent !important;
          box-shadow: none !important;
        }

        .leaflet-popup-content {
          margin: 0 !important;
        }

        .leaflet-container a.leaflet-popup-close-button {
          color: white !important;
          padding: 8px 12px 0 0 !important;
          z-index: 10 !important;
        }
      `}</style>
    </PageWrapper>
  );
};