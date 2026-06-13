import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, MapPin, Mic, Send, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { useNavigate } from 'react-router-dom';
import API from "../services/api";
export const SubmitSOS: React.FC = () => {
  

const navigate = useNavigate();

const [desc, setDesc] = useState("");
const [emergencyType, setEmergencyType] = useState("Medical");

const [latitude, setLatitude] = useState("");
const [longitude, setLongitude] = useState("");

const [image, setImage] = useState<File | null>(null);

const [incidentData, setIncidentData] = useState<any>(null);

const [isSubmitting, setIsSubmitting] = useState(false);
const [showModal, setShowModal] = useState(false);

const getLocation = () => {
  console.log("Location button clicked");

  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log("Location received:", position);

      setLatitude(position.coords.latitude.toString());
      setLongitude(position.coords.longitude.toString());

      alert("Location captured successfully");
    },
    (error) => {
      console.error("Geolocation Error:", error);

      alert(
        `Location Error: ${error.message}`
      );
    }
  );
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
if (!latitude || !longitude) {
    alert("Please click 'Use My Location' first");
    return;
  }
  try {
    setIsSubmitting(true);

    const formData = new FormData();

    formData.append("type", emergencyType);
    formData.append("description", desc);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    if (image) {
      formData.append("image", image);
    }

    const response = await API.post(
      "/incidents",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(response.data);

    setIncidentData(response.data.incident);

    setShowModal(true);
  } catch (error) {
    console.error(error);
    alert("Failed to submit SOS");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <PageWrapper className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Submit Emergency SOS</h1>
        <p className="text-gray-400">Our AI will analyze your report and dispatch help immediately.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Side - Instructions */}
        <div className="space-y-6">
          <Card glowEffect className="border-l-4 border-l-primary bg-primary/5">
            <h3 className="text-xl font-bold text-primary flex items-center gap-2 mb-4">
              <AlertTriangle className="w-6 h-6" /> Stay Calm & Safe
            </h3>
            <ul className="space-y-3 text-gray-300">
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" /> Ensure your own safety first before reporting.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" /> Provide clear and concise details about the incident.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" /> Attach a photo if it is safe to do so.</li>
              <li className="flex gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary mt-2" /> Stay on this page after submitting for live tracking.</li>
            </ul>
          </Card>
          
          <div className="rounded-xl overflow-hidden glass-panel flex items-center justify-center p-8 h-64 border-dashed border-2 border-white/20">
            <div className="text-center">
               <ShieldAlert className="w-16 h-16 text-white/20 mx-auto mb-4" />
               <p className="text-gray-500 font-medium">Your safety is our highest priority.</p>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Emergency Type</label>
              <select className="w-full bg-background/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors">
                <option value="medical">Medical Emergency</option>
                <option value="crime">Crime in Progress</option>
                <option value="fire">Fire Breakout</option>
                <option value="women_safety">Women Safety Issue</option>
                <option value="disaster">Natural Disaster</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Description</label>
              <textarea 
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                maxLength={500}
                placeholder="Describe the situation..."
                className="w-full bg-background/50 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                required
              />
              <div className="text-right text-xs text-gray-500 mt-1">{desc.length}/500</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/20 rounded-lg p-4 hover:bg-white/5 transition-colors text-gray-400 hover:text-primary hover:border-primary">
                <UploadCloud className="w-6 h-6" />
                <span className="text-sm font-medium">Upload Image</span>
              </button>
              
              <button
                type="button"
                 onClick={getLocation}
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/20 rounded-lg p-4 hover:bg-white/5 transition-colors text-gray-400 hover:text-primary hover:border-primary">
                <MapPin />
                  <span>Use My Location</span>
              </button>
            </div>

            <div className="flex gap-4 pt-4">
              <button type="button" className="glass-button p-4 rounded-lg bg-background border border-white/10 hover:bg-white/5 group">
                <Mic className="w-6 h-6 text-gray-400 group-hover:text-critical transition-colors" />
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="flex-1 glass-button bg-critical hover:bg-critical/90 text-white font-bold text-lg rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.3)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Processing via AI...</span>
                ) : (
                  <><Send className="w-5 h-5" /> Submit SOS Alert</>
                )}
              </button>
            </div>
          </form>
        </Card>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg"
            >
              <Card className="border-t-4 border-t-critical text-center p-8">
                <div className="w-16 h-16 bg-critical/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
                  <CheckCircle className="w-8 h-8 text-critical" />
                </div>
                <h2 className="text-2xl font-bold mb-2">SOS Alert Received</h2>
                <p className="text-gray-400 mb-6">AI analysis complete. Responders are being dispatched.</p>
                
                <div className="bg-background/50 rounded-lg p-4 space-y-4 mb-8 text-left border border-white/5">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Incident ID</span>
                    <span className="font-mono font-bold text-primary">
                    {incidentData?._id}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Severity Assessment</span>
                    <Badge severity={incidentData?.severity ||"Medium"} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">AI Priority Score</span>
                    <span className="font-bold text-critical">
                     {incidentData?.priorityScore}/100
                    </span>
                  </div>
                  <div className="pt-2 border-t border-white/10">
                    <span className="text-gray-400 text-sm block mb-1">AI Reasoning</span>
                    <p className="text-sm font-medium">
                    {incidentData?.reasoning}
                    </p>
                  </div>
                </div>

                <button 
                  onClick={() => navigate(`/incident/${incidentData?._id}`)}
                  className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  View Live Tracking
                </button>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
};
