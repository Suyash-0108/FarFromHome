import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Map, Activity, Zap, BarChart, ShieldAlert } from 'lucide-react';
import { PageWrapper } from '../components/PageWrapper';
import { Card } from '../components/Card';
import { Navbar } from '../components/Navbar';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Activity, title: 'AI Triage', desc: 'Instant severity analysis based on incoming reports.' },
    { icon: Map, title: 'Live Emergency Map', desc: 'Real-time situational awareness across the city.' },
    { icon: Shield, title: 'Women Safety Fast Track', desc: 'Prioritized routing for women safety incidents.' },
    { icon: Zap, title: 'Dispatch Recommendations', desc: 'AI-suggested optimal responder units.' },
    { icon: BarChart, title: 'Incident Analytics', desc: 'Deep dive into trends and response times.' },
    { icon: ShieldAlert, title: 'Real-Time Monitoring', desc: 'Continuous updates from active incidents.' },
  ];

  const stats = [
    { label: 'Emergencies Processed', value: '1.2M+' },
    { label: 'Avg. Response Time', value: '3.4m' },
    { label: 'Critical Incidents Detected', value: '450k' },
    { label: 'AI Accuracy', value: '99.8%' },
  ];

  const timeline = [
    'Citizen Sends SOS',
    'AI Analyzes Incident',
    'Priority Assigned',
    'Operator Notified',
    'Responders Dispatched'
  ];

  return (
    <div className="min-h-screen bg-background text-white relative overflow-hidden">
      <Navbar />
      
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden -z-10 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-critical/20 rounded-full blur-[150px]" />
        {/* Simple grid overlay */}
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '50px 50px' }} />
      </div>

      <PageWrapper className="pt-24 pb-20 px-6 max-w-7xl mx-auto space-y-32">
        
        {/* Hero Section */}
        <section className="text-center pt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-8 animate-float">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              System v2.0 Live
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
              AI-Powered Emergency <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">
                Prioritization & Response
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
              Intelligent triage, real-time situational awareness, and faster emergency response. Empowering operators to save more lives.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/sos')}
                className="glass-button bg-critical text-white px-8 py-4 rounded-lg font-bold text-lg w-full sm:w-auto shadow-[0_0_20px_rgba(239,68,68,0.4)] flex items-center justify-center gap-2 hover:bg-critical/90"
              >
                <ShieldAlert className="w-5 h-5" /> Submit SOS
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="glass-button glass-panel px-8 py-4 rounded-lg font-bold text-lg w-full sm:w-auto flex items-center justify-center gap-2 hover:bg-white/10"
              >
                Open Dashboard <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </section>

        {/* Stats Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card glowEffect className="text-center py-8">
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-400 uppercase tracking-wide">{stat.label}</div>
              </Card>
            </motion.div>
          ))}
        </section>

        {/* Features Section */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Command Center Capabilities</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to orchestrate emergency response efficiently and effectively.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card glowEffect className="h-full group hover:-translate-y-2 transition-transform duration-300">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <feat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-gray-400">{feat.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Timeline Section */}
        <section className="pb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Response Flow</h2>
            <p className="text-gray-400">From incident report to dispatch in seconds.</p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-1 bg-white/10 hidden md:block" />
            
            <div className="space-y-12">
              {timeline.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`flex flex-col md:flex-row items-center gap-6 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="flex-1 w-full text-center md:text-left">
                    <Card glowEffect className={`inline-block w-full md:w-3/4 ${idx % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto'}`}>
                      <h4 className="text-xl font-bold text-white">Step {idx + 1}</h4>
                      <p className="text-gray-400 mt-2">{step}</p>
                    </Card>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-background border-4 border-primary z-10 flex items-center justify-center flex-shrink-0 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                    <span className="font-bold text-primary">{idx + 1}</span>
                  </div>
                  <div className="flex-1 w-full hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </PageWrapper>
    </div>
  );
};
