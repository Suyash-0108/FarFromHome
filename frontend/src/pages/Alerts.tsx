import {
  AlertTriangle,
  Brain,
  Siren,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Alerts() {
  const navigate = useNavigate();

  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await API.get("/incidents");

      const incidents = (res.data.incidents || []).map(
        (incident: any) => ({
          ...incident,
          recommendedUnit:
            incident.recommendedUnit ||
            getRecommendedUnit(incident.type),
        })
      );

      setAlerts(incidents);
    } catch (error) {
      console.error("Failed to fetch alerts:", error);
    }
  };

  const getRecommendedUnit = (type: string) => {
    switch (type?.toLowerCase()) {
      case "fire":
        return "🚒 Fire Department";

      case "medical":
        return "🚑 Advanced Life Support";

      case "crime":
        return "👮 Police Response Unit";

      case "women safety":
        return "👮 Women Safety Cell";

      case "disaster":
        return "🌪️ Disaster Response Force";

      default:
        return "🚨 Emergency Operations Center";
    }
  };

  const criticalCount = alerts.filter(
    (a) => a.severity === "Critical"
  ).length;

  const highCount = alerts.filter(
    (a) => a.severity === "High"
  ).length;

  const mediumCount = alerts.filter(
    (a) => a.severity === "Medium"
  ).length;

  const resolvedCount = alerts.filter(
    (a) => a.status === "Resolved"
  ).length;

  const activeCount = alerts.filter(
    (a) => a.status !== "Resolved"
  ).length;

  const getAlertStyle = (severity: string) => {
    switch (severity) {
      case "Critical":
        return {
          border: "border-red-500/40",
          badge: "bg-red-500/20 text-red-400",
          icon: <AlertTriangle size={18} />,
        };

      case "High":
        return {
          border: "border-orange-500/40",
          badge: "bg-orange-500/20 text-orange-400",
          icon: <Siren size={18} />,
        };

      default:
        return {
          border: "border-cyan-500/40",
          badge: "bg-cyan-500/20 text-cyan-400",
          icon: <Brain size={18} />,
        };
    }
  };

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white">
            AI Incident Command Center
          </h1>

          <p className="text-slate-400 mt-2">
            Real-time emergency monitoring and response coordination.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400 font-semibold">
            {activeCount} Active Alerts
          </span>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-5 gap-4">
        <div className="bg-slate-900 border border-red-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Critical</p>
          <h2 className="text-3xl font-bold text-red-400">
            {criticalCount}
          </h2>
        </div>

        <div className="bg-slate-900 border border-orange-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">High</p>
          <h2 className="text-3xl font-bold text-orange-400">
            {highCount}
          </h2>
        </div>

        <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Medium</p>
          <h2 className="text-3xl font-bold text-cyan-400">
            {mediumCount}
          </h2>
        </div>

        <div className="bg-slate-900 border border-green-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Resolved</p>
          <h2 className="text-3xl font-bold text-green-400">
            {resolvedCount}
          </h2>
        </div>

        <div className="bg-slate-900 border border-yellow-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Active</p>
          <h2 className="text-3xl font-bold text-yellow-400">
            {activeCount}
          </h2>
        </div>
      </div>

      {/* Alert Feed */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between">
          <h2 className="text-xl font-semibold text-white">
            Live Alert Feed
          </h2>

          <span className="text-cyan-400 text-sm">
            Auto Updating
          </span>
        </div>

        <div className="p-5 space-y-4">
          {alerts.length === 0 ? (
            <div className="text-center text-slate-400 py-10">
              No alerts found
            </div>
          ) : (
            alerts.map((alert) => {
              const style = getAlertStyle(alert.severity);

              return (
                <div
                  key={alert._id}
                  onClick={() =>
                    navigate(`/incident/${alert._id}`)
                  }
                  className={`bg-[#091224] border ${style.border} rounded-xl p-5 transition hover:scale-[1.01] hover:border-primary cursor-pointer`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${style.badge}`}
                      >
                        {style.icon}
                        {alert.severity?.toUpperCase()}
                      </div>

                      <h3 className="text-white text-xl font-semibold mt-4">
                        {alert.type} Incident
                      </h3>

                      <p className="mt-2 text-slate-300">
                        {alert.description}
                      </p>

                      <p className="mt-3 text-sm text-slate-400 line-clamp-2">
                        {alert.reasoning}
                      </p>

                      <div className="flex flex-wrap gap-4 mt-4 text-sm text-slate-400">
                        <span>
                          Priority Score:{" "}
                          <span className="text-red-400 font-semibold">
                            {alert.priorityScore}/100
                          </span>
                        </span>

                        <span>
                          Assigned:{" "}
                          {alert.recommendedUnit}
                        </span>

                        <span>
                          Status: {alert.status}
                        </span>
                      </div>
                    </div>

                    <span className="text-slate-500 text-sm">
                      {alert.createdAt
                        ? new Date(
                            alert.createdAt
                          ).toLocaleString()
                        : "Unknown"}
                    </span>
                  </div>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/incident/${alert._id}`);
                      }}
                      className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition text-white"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}