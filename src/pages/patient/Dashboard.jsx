import React, { useState, useEffect } from 'react';
import { 
  Calendar, 
  FileText, 
  Clock, 
  MapPin, 
  Bell, 
  ArrowRight,
  MoreHorizontal,
  ChevronRight,
  Download,
  Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { motion } from 'framer-motion';

const PatientDashboard = () => {
  const { userData } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data for demo if Firestore is empty
    setAppointments([
      { id: 1, date: '25 April 2024', time: '10:30 AM', doctor: 'Dr. Sarah Wilson', status: 'Upcoming', type: 'Checkup' }
    ]);
    
    setHistory([
      { id: 1, date: '12 Mar 2024', diagnosis: 'Mild Gingivitis', doctor: 'Dr. Sarah Wilson', treatment: 'Scaling & Polishing' },
      { id: 2, date: '15 Jan 2024', diagnosis: 'Tooth Sensitivity', doctor: 'Dr. Robert Fox', treatment: 'Fluoride Application' },
    ]);
    
    setLoading(false);
  }, [userData]);

  return (
    <div className="space-y-10">
      {/* Welcome Section */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-primary-600 p-8 text-white">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <p className="text-primary-100 font-medium">Welcome back,</p>
            <h2 className="text-3xl font-bold">{userData?.name} 👋</h2>
            <p className="text-sm text-primary-100/80 mt-2">Patient ID: <span className="font-mono bg-white/10 px-2 py-0.5 rounded">{userData?.patientId || 'PAT-DEMO'}</span></p>
          </div>
          <div className="flex gap-4">
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 md:flex-none md:w-32 border border-white/20">
                <p className="text-[10px] uppercase font-bold text-primary-100 mb-1">Total Visits</p>
                <p className="text-2xl font-bold">12</p>
             </div>
             <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex-1 md:flex-none md:w-32 border border-white/20">
                <p className="text-[10px] uppercase font-bold text-primary-100 mb-1">Next Slot</p>
                <p className="text-2xl font-bold">25 Apr</p>
             </div>
          </div>
        </div>
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-400/20 rounded-full blur-2xl -ml-10 -mb-10"></div>
      </section>

      {/* Primary Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Book Visit', icon: <Calendar size={24}/>, color: 'bg-blue-50 text-blue-600' },
          { label: 'My Records', icon: <FileText size={24}/>, color: 'bg-green-50 text-green-600' },
          { label: 'Prescriptions', icon: <Download size={24}/>, color: 'bg-purple-50 text-purple-600' },
          { label: 'Help Desk', icon: <Info size={24}/>, color: 'bg-orange-50 text-orange-600' },
        ].map((action, i) => (
          <button key={i} className="flex flex-col items-center gap-3 p-6 bg-white rounded-3xl border border-slate-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-100 transition-all group">
            <div className={`p-4 rounded-2xl transition-transform group-hover:scale-110 ${action.color}`}>
              {action.icon}
            </div>
            <span className="text-sm font-bold text-slate-700">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-2 gap-10">
        {/* Appointments */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Your Appointments</h3>
            <button className="text-primary-600 text-sm font-bold flex items-center gap-1 group">
              View All <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="space-y-4">
            {appointments.map((apt) => (
              <motion.div 
                key={apt.id}
                whileHover={{ y: -5 }}
                className="card p-6 bg-white border-l-4 border-l-primary-500 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="flex gap-4">
                  <div className="w-14 h-14 bg-primary-50 text-primary-600 rounded-2xl flex flex-col items-center justify-center font-bold">
                    <span className="text-xs">APR</span>
                    <span className="text-xl">25</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800">{apt.type}</h4>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <Clock size={14} /> {apt.time}
                    </p>
                    <p className="text-sm text-slate-500 mt-1">{apt.doctor}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between md:block text-right">
                  <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    {apt.status}
                  </span>
                  <button className="md:mt-3 text-slate-400 hover:text-red-500 text-xs font-bold block ml-auto">
                    Reschedule
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent History */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800">Treatment Timeline</h3>
          <div className="relative space-y-8 before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
            {history.map((h, i) => (
              <div key={h.id} className="relative pl-14">
                <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-white border-4 border-primary-500 z-10"></div>
                <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{h.date}</span>
                    <button className="text-primary-600 hover:bg-primary-50 p-1.5 rounded-lg">
                      <Download size={16} />
                    </button>
                  </div>
                  <h4 className="font-bold text-slate-800 mb-1">{h.diagnosis}</h4>
                  <p className="text-xs text-slate-500 mb-3">{h.treatment}</p>
                  <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600">
                      {h.doctor.charAt(4)}
                    </div>
                    <span className="text-xs font-medium text-slate-600">{h.doctor}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
