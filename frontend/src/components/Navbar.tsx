import React from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldAlert, Map, LayoutDashboard, Send } from 'lucide-react';
import { cn } from '../lib/utils';

export const Navbar: React.FC = () => {
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Live Map', path: '/map', icon: Map },
    { name: 'Submit SOS', path: '/sos', icon: Send },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 z-50 glass-panel border-b border-white/10 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <ShieldAlert className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
        <span className="text-xl font-bold tracking-wider text-glow">SENTINEL<span className="text-primary">AI</span></span>
      </div>
      
      <div className="hidden md:flex items-center gap-6">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300",
              isActive 
                ? "bg-primary/20 text-primary border border-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]" 
                : "text-gray-400 hover:text-white hover:bg-white/5"
            )}
          >
            <item.icon className="w-4 h-4" />
            <span className="font-medium text-sm">{item.name}</span>
          </NavLink>
        ))}
      </div>

      
    </nav>
  );
};
