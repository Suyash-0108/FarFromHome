
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { SubmitSOS } from './pages/SubmitSOS';
import { OperatorDashboard } from './pages/OperatorDashboard';
import { LiveMap } from './pages/LiveMap';
import { IncidentDetails } from './pages/IncidentDetails';
import Settings from "./pages/Settings";
import Alerts from "./pages/Alerts";


const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<OperatorDashboard />} />
          <Route path="/map" element={<LiveMap />} />
          <Route path="/sos" element={<SubmitSOS />} />
          <Route path="/incident/:id" element={<IncidentDetails />} />
          
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

    </AnimatePresence>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}

export default App;
