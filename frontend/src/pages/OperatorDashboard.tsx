import React, { useState,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, Users, ShieldCheck, AlertTriangle, Search, Filter, ArrowUpRight, TrendingUp } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { Badge} from '../components/Badge';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
export const OperatorDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [incidents, setIncidents] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [categories, setCategories] = useState<any[]>([]);
 useEffect(() => {
  fetchIncidents();
  fetchStats();
  fetchCategories();
}, []);

const fetchIncidents = async () => {
  try {
    const res = await API.get("/incidents/");

    console.log("Incidents:", res.data);

    setIncidents(res.data.incidents || []);
  } catch (error) {
    console.error(error);
  }
};

const fetchStats = async () => {
  try {
    const res = await API.get("/dashboard/stats");

    console.log("Stats:", res.data);

    setStats(res.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchCategories = async () => {
  try {
    const res = await API.get("/dashboard/categories");
    setCategories(res.data);
  } catch (error) {
    console.error(error);
  }
};

const statCards = [
  {
    label: "Total Active",
    value: stats?.total || 0,
    icon: Activity,
    color: "text-primary",
  },
  {
    label: "Critical Cases",
    value: stats?.critical || 0,
    icon: AlertTriangle,
    color: "text-critical",
    glow: true,
  },
  {
    label: "Assigned",
    value: stats?.assigned || 0,
    icon: Users,
    color: "text-blue-400",
  },
  {
    label: "Resolved",
    value: stats?.resolved || 0,
    icon: ShieldCheck,
    color: "text-low",
  },
];

const filteredIncidents = incidents.filter((incident) => {
  const search = searchQuery.toLowerCase();

  return (
    incident._id?.toLowerCase().includes(search) ||
    incident.type?.toLowerCase().includes(search) ||
    incident.status?.toLowerCase().includes(search) ||
    incident.severity?.toLowerCase().includes(search) ||
    `${incident.latitude},${incident.longitude}`
      .toLowerCase()
      .includes(search)
  );
});


  return (
    
    <PageWrapper className="h-full flex flex-col">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-1">Command Center</h1>
          <p className="text-gray-400">Live AI prioritization and operations overview.</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search ID, Location..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-background/50 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
            />
          </div>
          <button className="glass-button p-2.5 rounded-lg bg-background/50 border border-white/10 hover:bg-white/5">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((stat, idx) => (
          <Card key={idx} glowEffect={stat.glow} className={`p-5 ${stat.glow ? 'border-critical/30 bg-critical/5' : ''}`}>
            <div className="flex justify-between items-start mb-2">
              <div className={`p-2 rounded-lg bg-white/5 ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
              {stat.glow && <span className="flex w-2 h-2 rounded-full bg-critical animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
            </div>
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
          </Card>
        ))}
      </div>

      <div className="flex-1 grid lg:grid-cols-3 gap-6 min-h-0">
        
        {/* Incident Table */}
        <Card className="lg:col-span-2 flex flex-col p-0 overflow-hidden">
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/[0.02]">
            <h2 className="text-lg font-bold">Live Incidents Feed</h2>
            <div className="flex items-center gap-2 text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md border border-primary/20">
              <Activity className="w-3 h-3 animate-pulse" /> Auto-updating
            </div>
          </div>
          <div className="overflow-x-auto overflow-y-auto flex-1">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white/[0.02] text-gray-400 sticky top-0 backdrop-blur-md z-10 border-b border-white/10">
                <tr>
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Type</th>
                  <th className="p-4 font-medium">Priority</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Time</th>
                  <th className="p-4 font-medium"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
  {filteredIncidents.length === 0 ? (
    <tr>
      <td
        colSpan={7}
        className="p-8 text-center text-gray-500"
      >
        No incidents found
      </td>
    </tr>
  ) : (
    filteredIncidents.map((incident, idx) => (
      <motion.tr
        key={incident._id}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.05 }}
        className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
        onClick={() => navigate(`/incident/${incident._id}`)}
      >
        <td className="p-4 font-mono text-gray-300">
          {incident._id?.slice(-6)}
        </td>

        <td className="p-4 font-medium">
          {incident.type}
        </td>

        <td className="p-4">
          <div className="flex items-center gap-2">
            <Badge severity={incident.severity} />

            <span className="text-xs text-gray-500 font-mono">
              {incident.priorityScore}/100
            </span>
          </div>
        </td>

        <td className="p-4 text-gray-300">
          <span
            className={`flex items-center gap-1.5 ${
              incident.status === "Open"
                ? "text-critical"
                : incident.status === "Assigned"
                ? "text-primary"
                : "text-gray-500"
            }`}
          >
            {incident.status === "Open" && (
              <span className="w-1.5 h-1.5 rounded-full bg-critical animate-pulse" />
            )}

            {incident.status}
          </span>
        </td>

        <td className="p-4 text-gray-400 truncate max-w-[150px]">
          {incident.latitude?.toFixed(4)},{" "}
          {incident.longitude?.toFixed(4)}
        </td>

        <td className="p-4 text-gray-400">
          {new Date(incident.createdAt).toLocaleString()}
        </td>

        <td className="p-4 text-right">
          <button className="text-gray-500 group-hover:text-primary transition-colors p-1">
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </td>
      </motion.tr>
    ))
  )}
</tbody>
            </table>
          </div>
        </Card>

        {/* AI Insights Panel */}
        <Card className="flex flex-col border-primary/20 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30 shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>

            <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">AI Intelligence</h2>
          </div>

           <div className="space-y-6 flex-1 overflow-y-auto pr-2">


            
            
            <div>
  <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
    Category Breakdown
  </h3>

  <div className="space-y-3">
    {categories.map((cat, idx) => (
      <div key={idx} className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-300">
            {cat._id || "Other"}
          </span>

          <span className="font-mono text-gray-500">
            {cat.count}
          </span>
        </div>

        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary"
            style={{
              width: `${Math.min(cat.count * 10, 100)}%`,
            }}
          />
        </div>
      </div>
    ))}
  </div>
</div>

          </div>
        </Card>

      </div>
    </PageWrapper>
  );
};

