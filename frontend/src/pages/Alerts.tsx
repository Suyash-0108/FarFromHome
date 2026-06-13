import {
  Bell,
  AlertTriangle,
  Brain,
  Siren,
  CheckCircle,
} from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "Critical",
    message: "Fire reported near Sector 12",
    priority: "Critical",
    assigned: "Fire Unit 4",
    time: "2 min ago",
  },
  {
    id: 2,
    type: "SOS",
    message: "Medical assistance requested",
    priority: "High",
    assigned: "Ambulance 2",
    time: "12 min ago",
  },
  {
    id: 3,
    type: "AI",
    message: "Flood risk probability increased",
    priority: "Medium",
    assigned: "Monitoring",
    time: "20 min ago",
  },
];

export default function Alerts() {
  const getAlertStyle = (type: string) => {
    switch (type) {
      case "Critical":
        return {
          border: "border-red-500/40",
          badge: "bg-red-500/20 text-red-400",
          icon: <AlertTriangle size={18} />,
        };

      case "SOS":
        return {
          border: "border-orange-500/40",
          badge: "bg-orange-500/20 text-orange-400",
          icon: <Siren size={18} />,
        };

      case "AI":
        return {
          border: "border-cyan-500/40",
          badge: "bg-cyan-500/20 text-cyan-400",
          icon: <Brain size={18} />,
        };

      default:
        return {
          border: "border-slate-500/40",
          badge: "bg-slate-500/20 text-slate-400",
          icon: <Bell size={18} />,
        };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Alerts Center
          </h1>
          <p className="text-slate-400 mt-2">
            Real-time monitoring and incident notifications.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30">
          <span className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-red-400 font-semibold">
            3 Active Alerts
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-red-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Critical</p>
          <h2 className="text-3xl font-bold text-red-400">1</h2>
        </div>

        <div className="bg-slate-900 border border-orange-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">SOS</p>
          <h2 className="text-3xl font-bold text-orange-400">1</h2>
        </div>

        <div className="bg-slate-900 border border-cyan-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">AI Alerts</p>
          <h2 className="text-3xl font-bold text-cyan-400">1</h2>
        </div>

        <div className="bg-slate-900 border border-green-500/20 rounded-xl p-5">
          <p className="text-slate-400 text-sm">Resolved</p>
          <h2 className="text-3xl font-bold text-green-400">12</h2>
        </div>
      </div>

      {/* Live Feed */}
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
          {alerts.map((alert) => {
            const style = getAlertStyle(alert.type);

            return (
              <div
                key={alert.id}
                className={`bg-[#091224] border ${style.border} rounded-xl p-5 transition hover:scale-[1.01]`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${style.badge}`}
                    >
                      {style.icon}
                      {alert.type.toUpperCase()}
                    </div>

                    <h3 className="text-white text-xl font-semibold mt-4">
                      {alert.message}
                    </h3>

                    <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-400">
                      <span>
                        Priority: {alert.priority}
                      </span>

                      <span>
                        Assigned: {alert.assigned}
                      </span>
                    </div>
                  </div>

                  <span className="text-slate-500">
                    {alert.time}
                  </span>
                </div>

                <div className="flex gap-3 mt-5">
                  <button className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 transition">
                    View Details
                  </button>

                  <button className="px-4 py-2 rounded-lg bg-orange-600 hover:bg-orange-500 transition">
                    Assign Unit
                  </button>

                  <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition flex items-center gap-2">
                    <CheckCircle size={16} />
                    Resolve
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}