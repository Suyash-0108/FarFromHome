import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, AlertTriangle, Activity, Camera, ShieldCheck, CheckCircle, Truck, Info } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';

export const IncidentDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data for the specific incident
  const incident = {
    id: id || '8492',
    type: 'Medical',
    priority: 98,
    severity: 'Critical' as const,
    status: 'Open',
    location: 'Rajiv Chowk Metro Station, Gate 2',
    reporter: 'Anonymous (Verified Device)',
    time: '2 minutes ago',
    description: 'Passenger collapsed on platform. Unresponsive, possible cardiac arrest. Crowd gathering, need immediate assistance.',
  };

  return (
    <PageWrapper className="max-w-7xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold font-mono">#INC-{incident.id}</h1>
              <Badge severity={incident.severity} />
              <span className={`px-2 py-0.5 rounded text-xs font-bold ${incident.status === 'Open' ? 'bg-critical/20 text-critical border border-critical/50' : 'bg-primary/20 text-primary border border-primary/50'}`}>
                {incident.status.toUpperCase()}
              </span>
            </div>
            <p className="text-gray-400 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {incident.time}</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {incident.location}</span>
            </p>
          </div>
        </div>
        
        {/* Status Controls */}
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none glass-button bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
            <ShieldCheck className="w-4 h-4" /> Assign Unit
          </button>
          <button className="flex-1 md:flex-none glass-button bg-white/5 hover:bg-white/10 text-white border border-white/10 px-4 py-2 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
            <CheckCircle className="w-4 h-4 text-low" /> Mark Resolved
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* AI Analysis Card */}
          <Card glowEffect className="border-critical/30 bg-gradient-to-r from-critical/5 to-transparent relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-critical/10 rounded-full blur-[80px] pointer-events-none" />
            <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-critical" /> Sentinel AI Analysis
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <div className="text-sm text-gray-400 mb-1">Priority Score</div>
                <div className="text-4xl font-black text-critical">{incident.priority}<span className="text-xl text-critical/50">/100</span></div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Detected Type</div>
                <div className="text-lg font-bold">{incident.type} Emergency</div>
              </div>
              <div>
                <div className="text-sm text-gray-400 mb-1">Confidence Interval</div>
                <div className="text-lg font-bold text-primary">96.4%</div>
              </div>
            </div>

            <div className="bg-background/50 rounded-lg p-4 border border-white/5 border-l-4 border-l-critical">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-critical mt-0.5" />
                <div>
                  <h4 className="font-bold text-white mb-1">AI Reasoning</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    Keywords "unresponsive" and "cardiac arrest" detected. Location (Metro Station) implies high foot traffic and potential for secondary incidents. Immediate Life Support (ALS) required within 4 minutes to maximize survival probability.
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Details & Evidence */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary" /> Incident Report
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Description</div>
                  <p className="text-sm text-gray-300">{incident.description}</p>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reporter</div>
                  <p className="text-sm text-gray-300">{incident.reporter}</p>
                </div>
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Exact Location</div>
                  <p className="text-sm text-gray-300">{incident.location}</p>
                </div>
              </div>
            </Card>

            <Card className="flex flex-col">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" /> Attached Evidence
              </h3>
              <div className="flex-1 bg-background/50 rounded-lg border border-white/10 flex items-center justify-center flex-col gap-2 p-6 min-h-[200px]">
                {/* Placeholder for uploaded image */}
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-2">
                  <Camera className="w-8 h-8 text-gray-500" />
                </div>
                <span className="text-sm font-medium text-gray-400">No images uploaded</span>
              </div>
            </Card>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Dispatch Recommendation */}
          <Card className="border-primary/30">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5 text-primary" /> Dispatch Recommendations
            </h3>
            
            <div className="space-y-3 mb-6">
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-primary">ALS Ambulance</div>
                  <div className="text-xs text-gray-400">Unit 42 • 1.2 miles away (Est. 3m)</div>
                </div>
                <button className="bg-primary text-black font-bold text-xs px-3 py-1.5 rounded hover:bg-primary/90 transition-colors">
                  Dispatch
                </button>
              </div>
              
              <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex justify-between items-center">
                <div>
                  <div className="font-bold text-gray-300">Transit Police</div>
                  <div className="text-xs text-gray-400">Patrol 7 • On site</div>
                </div>
                <button className="bg-white/10 hover:bg-white/20 text-white font-bold text-xs px-3 py-1.5 rounded transition-colors">
                  Alert
                </button>
              </div>
            </div>

            <button className="w-full bg-primary/20 hover:bg-primary/30 text-primary border border-primary/50 py-2 rounded-lg font-bold text-sm transition-colors">
              Dispatch Recommended Units
            </button>
          </Card>

          {/* Timeline */}
          <Card>
            <h3 className="text-lg font-bold mb-4">Event Timeline</h3>
            <div className="relative pl-4 space-y-6">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-white/10" />
              
              <div className="relative">
                <div className="absolute -left-4 w-3 h-3 rounded-full bg-critical shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <div className="text-sm font-bold text-critical mb-1">SOS Received</div>
                <div className="text-xs text-gray-400">10:42:15 AM - Automated via Web App</div>
              </div>
              
              <div className="relative">
                <div className="absolute -left-4 w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                <div className="text-sm font-bold text-primary mb-1">AI Triage Complete</div>
                <div className="text-xs text-gray-400">10:42:16 AM - Priority 98 assigned</div>
              </div>

              <div className="relative">
                <div className="absolute -left-4 w-3 h-3 rounded-full bg-white/20" />
                <div className="text-sm font-bold text-gray-400 mb-1">Operator Assigned</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
            </div>
          </Card>
          
        </div>
      </div>
    </PageWrapper>
  );
};
