import { useState } from "react";
import {
  User,
  Bell,
  Shield,
  Map,
  Brain,
  Settings as SettingsIcon,
} from "lucide-react";

export default function Settings() {
  
  const [alertSound, setAlertSound] = useState("standard");

    

  return (
    <div className="min-h-screen bg-[#020817] text-white p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Settings</h1>
        <p className="text-slate-400 mt-2">
          Configure SentinelAI preferences and system settings.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">

        {/* Profile */}
        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="text-cyan-400" />
            <h2 className="text-xl font-semibold">Profile</h2>
          </div>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-slate-800 mb-3"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-800 mb-3"
          />

          <button className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg">
            Save Changes
          </button>
        </div>

        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6">
  <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
    🔊 Alert Audio
  </h2>

  <div className="space-y-3">
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name="alertSound"
        value="silent"
        checked={alertSound === "silent"}
        onChange={(e) => setAlertSound(e.target.value)}
      />
      Silent
    </label>

    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name="alertSound"
        value="standard"
        checked={alertSound === "standard"}
        onChange={(e) => setAlertSound(e.target.value)}
      />
      Standard
    </label>

    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="radio"
        name="alertSound"
        value="siren"
        checked={alertSound === "siren"}
        onChange={(e) => setAlertSound(e.target.value)}
      />
      Emergency Siren
    </label>
  </div>

  <button
    className="mt-5 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg"
    onClick={() => {
      alert(`Selected: ${alertSound}`);
    }}
  >
    Save Preference
  </button>
</div>
        {/* Notifications */}
        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-cyan-400" />
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>

          <div className="space-y-3">
            <label className="block">
              <input type="checkbox" defaultChecked /> Critical Alerts
            </label>

            <label className="block">
              <input type="checkbox" defaultChecked /> SOS Notifications
            </label>

            <label className="block">
              <input type="checkbox" defaultChecked /> AI Predictions
            </label>
          </div>
        </div>

        {/* AI Settings */}
        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="text-cyan-400" />
            <h2 className="text-xl font-semibold">AI Intelligence</h2>
          </div>

          <select className="w-full p-3 rounded-lg bg-slate-800">
            <option>Conservative</option>
            <option>Balanced</option>
            <option>Aggressive</option>
          </select>
        </div>

        {/* Map Settings */}
        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Map className="text-cyan-400" />
            <h2 className="text-xl font-semibold">Map Preferences</h2>
          </div>

          <div className="space-y-3">
            <label className="block">
              <input type="checkbox" defaultChecked /> Show Traffic Layer
            </label>

            <label className="block">
              <input type="checkbox" defaultChecked /> Show Emergency Zones
            </label>

            <label className="block">
              <input type="checkbox" /> Weather Layer
            </label>
          </div>
        </div>

        {/* Security */}
        <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-cyan-400" />
            <h2 className="text-xl font-semibold">Security</h2>
          </div>

          <input
            type="password"
            placeholder="Current Password"
            className="w-full p-3 rounded-lg bg-slate-800 mb-3"
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-3 rounded-lg bg-slate-800 mb-3"
          />

          <button className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg">
            Update Password
          </button>
        </div>
      </div>

      {/* System Information */}
      <div className="bg-slate-900 border border-cyan-500/20 rounded-2xl p-6 mt-6">
        <div className="flex items-center gap-3 mb-4">
          <SettingsIcon className="text-cyan-400" />
          <h2 className="text-xl font-semibold">System Information</h2>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <p className="text-slate-400">Version</p>
            <p>SentinelAI v1.0</p>
          </div>

          <div>
            <p className="text-slate-400">Backend</p>
            <p className="text-green-400">Online</p>
          </div>

          <div>
            <p className="text-slate-400">Database</p>
            <p className="text-green-400">Connected</p>
          </div>

          <div>
            <p className="text-slate-400">AI Engine</p>
            <p className="text-green-400">Active</p>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-950 border border-red-500/30 rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-semibold text-red-400 mb-4">
          Danger Zone
        </h2>

        <div className="flex gap-4">
          <button className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg">
            Clear Cache
          </button>

          <button className="bg-red-800 hover:bg-red-700 px-4 py-2 rounded-lg">
            Reset Preferences
          </button>
        </div>
      </div>
    </div>
  );
}