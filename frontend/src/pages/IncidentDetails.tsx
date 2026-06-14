import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, AlertTriangle, Activity, Camera, ShieldCheck, CheckCircle, Truck, Info } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useEffect, useState } from "react";
import API from "../services/api";
export const IncidentDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [incident, setIncident] = useState<any>(null);
  useEffect(() => {
    fetchIncident();
    const handleResolve = async () => {
  try {
    const res = await API.patch(
      `/incidents/${id}/status`,
      {
        status: "Resolved",
      }
    );

    setIncident(res.data.incident);

    navigate("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Failed to resolve incident");
  }
};
  }, []);

  const fetchIncident = async () => {
    try {
      const res = await API.get(`/incidents/${id}`);

      console.log(res.data);

      setIncident(res.data.incident);
    } catch (error) {
      console.error(error);
    }
  };
  const handleResolve = async () => {
  try {
    const res = await API.patch(
      `/incidents/${id}/status`,
      {
        status: "Resolved",
      }
    );

    setIncident(res.data.incident);

    navigate("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Failed to resolve incident");
  }
};
  if (!incident) {
    return (
      <PageWrapper>
        <div>Loading Incident...</div>
      </PageWrapper>
    );
  }
 return (
  <PageWrapper className="max-w-[1600px] mx-auto px-6 space-y-8">

    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-xl md:text-2xl font-bold font-mono">
              {incident._id}
            </h1>

            <Badge severity={incident.severity} />

            <span
              className={`px-2 py-0.5 rounded text-xs font-bold ${
                incident.status === "Open"
                  ? "bg-critical/20 text-critical border border-critical/50"
                  : "bg-primary/20 text-primary border border-primary/50"
              }`}
            >
              {incident.status?.toUpperCase()}
            </span>
          </div>

          <p className="text-gray-400 flex flex-wrap items-center gap-4 text-sm">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {new Date(incident.createdAt).toLocaleString()}
            </span>

            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {incident.latitude}, {incident.longitude}
            </span>
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="glass-button bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 px-4 py-2 rounded-lg font-bold flex items-center gap-2">
          <ShieldCheck className="w-4 h-4" />
          Assign Unit
        </button>

        {incident.status !== "Resolved" && (
  <button
    onClick={handleResolve}
    className="glass-button bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg font-bold flex items-center gap-2"
  >
    <CheckCircle className="w-4 h-4 text-low" />
    Mark Resolved
  </button>
)}
      </div>
    </div>

    <div className="grid lg:grid-cols-3 gap-6">

      {/* Main Content */}
      <div className="lg:col-span-2 space-y-6">

        {/* AI Analysis */}
        <Card
          glowEffect
          className="border-critical/30 bg-gradient-to-r from-critical/5 to-transparent relative overflow-hidden"
        >
          <div className="absolute right-0 top-0 w-64 h-64 bg-critical/10 rounded-full blur-[80px]" />

          <h2 className="text-xl font-bold flex items-center gap-2 mb-8">
            <Activity className="w-5 h-5 text-critical" />
            Sentinel AI Analysis
          </h2>

          <div className="flex flex-wrap gap-12 mb-8">
            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                Priority Score
              </div>

              <div className="text-5xl font-black text-critical">
                {incident.priorityScore}
                <span className="text-2xl text-critical/40">/100</span>
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                Detected Type
              </div>

              <div className="text-2xl font-bold text-primary">
                {incident.emergencyType || incident.type}
              </div>
            </div>
          </div>

          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 border border-white/10 border-l-4 border-l-critical">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-critical mt-1" />

              <div>
                <h4 className="font-bold text-white mb-3">
                  AI Reasoning
                </h4>

                <p className="text-gray-300 text-base leading-8 whitespace-pre-wrap">
                  {incident.reasoning}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Report + Evidence */}
        <div className="grid lg:grid-cols-3 gap-6">

          <Card className="lg:col-span-2">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" />
              Incident Report
            </h3>

            <div className="space-y-6">
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Description
                </div>

                <p className="text-gray-300 leading-7">
                  {incident.description}
                </p>
              </div>

              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Exact Location
                </div>

                <p className="text-gray-300">
                  {incident.latitude}, {incident.longitude}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              Evidence
            </h3>

            {incident.imageUrl ? (
              <img
                src={incident.imageUrl}
                alt="Evidence"
                className="w-full h-[260px] rounded-xl object-cover"
              />
            ) : (
              <div className="h-[260px] flex flex-col items-center justify-center text-gray-500 border border-white/10 rounded-xl">
                <Camera className="w-10 h-10 mb-3" />
                No Evidence Uploaded
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Right Side Dispatch Card */}
      <div>
        <Card className="sticky top-6 border-primary/20">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            Recommended Response
          </h3>

          <div className="space-y-3">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <p className="font-semibold text-primary">
                {incident.type === "Fire"
                  ? "Fire & Rescue Team"
                  : incident.type === "Medical"
                  ? "Advanced Life Support Unit"
                  : "Emergency Response Team"}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-gray-300 text-sm">
                Priority Level: {incident.severity}
              </p>
            </div>
          </div>
        </Card>
      </div>

    </div>
  </PageWrapper>
);
}