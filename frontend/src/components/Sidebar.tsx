import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Send,
  Settings,
  Bell,
} from "lucide-react";
import { cn } from "../lib/utils";
import API from "../services/api";

export const Sidebar: React.FC = () => {
  const [activeAlerts, setActiveAlerts] = useState(0);

  useEffect(() => {
    fetchAlertCount();

    const interval = setInterval(() => {
      fetchAlertCount();
    }, 10000); // refresh every 10 sec

    return () => clearInterval(interval);
  }, []);

  const fetchAlertCount = async () => {
    try {
      const res = await API.get("/incidents");

      const active = (res.data.incidents || []).filter(
        (incident: any) =>
          incident.status?.toLowerCase() !== "resolved"
      ).length;

      setActiveAlerts(active);
    } catch (error) {
      console.error("Failed to fetch alert count:", error);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Live Map",
      path: "/map",
      icon: Map,
    },
    {
      name: "Submit SOS",
      path: "/sos",
      icon: Send,
    },
  ];

  const bottomItems = [
    {
      name: "Alerts",
      path: "/alerts",
      icon: Bell,
      badge: activeAlerts,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 glass-panel border-r border-white/10 p-4 flex flex-col hidden lg:flex">
      {/* Main Menu */}
      <div className="flex flex-col gap-2 mt-4 flex-1">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
          Main Menu
        </div>

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative",
                isActive
                  ? "bg-gradient-to-r from-primary/20 to-transparent text-primary border-l-2 border-primary"
                  : "text-gray-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
              )
            }
          >
            <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* System */}
      <div className="flex flex-col gap-2 mb-4">
        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-4">
          System
        </div>

        {bottomItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive
                  ? "text-primary"
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              )
            }
          >
            <div className="flex items-center gap-3">
              <item.icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              <span className="font-medium">{item.name}</span>
            </div>

            {item.badge !== undefined && item.badge > 0 && (
              <span className="bg-critical/20 text-critical border border-critical/50 text-xs py-0.5 px-2 rounded-full font-bold animate-pulse">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}
      </div>
    </aside>
  );
};