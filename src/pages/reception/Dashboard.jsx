import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle, 
  Search, 
  Plus, 
  ArrowRight,
  TrendingUp,
  MoreVertical
} from 'lucide-react';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const ReceptionDashboard = () => {
  const [stats, setStats] = useState({
    today: 0,
    waiting: 0,
    completed: 0
  });
  const [recentPatients, setRecentPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const todayStr = format(new Date(), 'yyyy-MM-dd');
        
        // Mock fetch or actual Firestore query
        // For now, I'll use placeholders if DB is empty
        const q = query(collection(db, 'patients'), orderBy('createdAt', 'desc'), limit(5));
        const querySnapshot = await getDocs(q);
        const patients = [];
        querySnapshot.forEach((doc) => {
          patients.push({ id: doc.id, ...doc.data() });
        });
        setRecentPatients(patients);
        
        setStats({
          today: 12,
          waiting: 3,
          completed: 9
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    { title: 'Total Appointments', value: stats.today, icon: <Calendar className="text-blue-500" />, bg: 'bg-blue-50' },
    { title: 'Waiting in Queue', value: stats.waiting, icon: <Clock className="text-orange-500" />, bg: 'bg-orange-50' },
    { title: 'Completed Visits', value: stats.completed, icon: <CheckCircle className="text-green-500" />, bg: 'bg-green-50' },
    { title: 'New Registrations', value: 4, icon: <TrendingUp className="text-purple-500" />, bg: 'bg-purple-50' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hello, Receptionist 👋</h2>
          <p className="text-slate-500">Here's what's happening at the clinic today.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input className="input-field pl-10 md:w-64" placeholder="Search patient ID/Phone" />
          </div>
          <button className="btn-primary flex items-center gap-2">
            <Plus size={18} />
            Check-in
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card flex items-center gap-4 hover:shadow-md transition-shadow cursor-default"
          >
            <div className={`p-4 rounded-2xl ${card.bg}`}>
              {card.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-400">{card.title}</p>
              <h3 className="text-2xl font-bold text-slate-800">{card.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Today's Queue */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-slate-800">Today's Token Queue</h3>
            <button className="text-primary-600 text-sm font-bold hover:underline">View All</button>
          </div>
          
          <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden shadow-sm">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="px-6 py-4 font-bold">Token</th>
                  <th className="px-6 py-4 font-bold">Patient</th>
                  <th className="px-6 py-4 font-bold">Doctor</th>
                  <th className="px-6 py-4 font-bold">Status</th>
                  <th className="px-6 py-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {[1, 2, 3].map((item) => (
                  <tr key={item} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-primary-600">#00{item}</td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-slate-800">Mark Johnson</p>
                      <p className="text-xs text-slate-400">PAT-829371</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">Dr. Sarah Wilson</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        item === 1 ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {item === 1 ? 'Waiting' : 'Checked In'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-slate-400 hover:text-primary-600 rounded-lg hover:bg-white group-hover:shadow-sm transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions / Recent Patients */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800">Quick Actions</h3>
          <div className="grid grid-cols-1 gap-4">
            <button className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl hover:border-primary-500 hover:shadow-lg hover:shadow-primary-100 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary-100 text-primary-600 rounded-2xl">
                  <Plus size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-800">Add New Patient</p>
                  <p className="text-xs text-slate-400">Quick registration form</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-300 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all" />
            </button>
            
            <button className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-3xl hover:border-primary-500 hover:shadow-lg hover:shadow-primary-100 transition-all group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-2xl">
                  <Calendar size={20} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-slate-800">Schedule Slot</p>
                  <p className="text-xs text-slate-400">Book for future date</p>
                </div>
              </div>
              <ArrowRight size={18} className="text-slate-300 group-hover:text-primary-600 transform group-hover:translate-x-1 transition-all" />
            </button>
          </div>

          <div className="pt-4">
            <h4 className="font-bold text-slate-800 mb-4">Patient Search Results</h4>
            {recentPatients.length > 0 ? (
              <div className="space-y-3">
                {recentPatients.map(p => (
                  <div key={p.id} className="card p-3 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500">
                      {p.name.charAt(0)}
                     </div>
                     <div>
                       <p className="text-sm font-bold text-slate-800">{p.name}</p>
                       <p className="text-[10px] text-slate-400">{p.patientId}</p>
                     </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-8 border-2 border-dashed border-slate-100 rounded-3xl">
                <Users size={32} className="mx-auto text-slate-200 mb-2" />
                <p className="text-xs text-slate-400">No patients registered yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionDashboard;
