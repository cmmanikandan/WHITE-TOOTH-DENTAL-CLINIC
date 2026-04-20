import React from 'react';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  ChevronRight, 
  Settings, 
  ShieldCheck,
  CreditCard,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { auth } from '../../firebase/config';
import { motion } from 'framer-motion';

const PatientProfile = () => {
  const { userData } = useAuth();

  const menuItems = [
    { label: 'Personal Information', icon: <User size={20} />, color: 'bg-blue-50 text-blue-500' },
    { label: 'Insurance Details', icon: <ShieldCheck size={20} />, color: 'bg-green-50 text-green-500' },
    { label: 'Payments & Billing', icon: <CreditCard size={20} />, color: 'bg-purple-50 text-purple-500' },
    { label: 'App Settings', icon: <Settings size={20} />, color: 'bg-slate-100 text-slate-500' },
  ];

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Profile Header */}
      <section className="text-center bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-32 bg-slate-50 border-b border-slate-100/50"></div>
        
        <div className="relative mt-4">
          <div className="w-24 h-24 rounded-[2rem] bg-primary-600 text-white flex items-center justify-center font-bold text-3xl mx-auto ring-8 ring-white shadow-xl">
            {userData?.name?.charAt(0)}
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mt-6">{userData?.name}</h2>
          <p className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">Patient ID: {userData?.patientId || 'PAT-NEW'}</p>
          
          <div className="flex justify-center gap-6 mt-8">
            <div className="text-center">
              <p className="text-lg font-bold text-slate-800">24</p>
              <p className="text-xs text-slate-400 font-medium">Age</p>
            </div>
            <div className="w-px h-10 bg-slate-100"></div>
            <div className="text-center">
              <p className="text-lg font-bold text-slate-800">{userData?.gender || 'Male'}</p>
              <p className="text-xs text-slate-400 font-medium">Gender</p>
            </div>
            <div className="w-px h-10 bg-slate-100"></div>
            <div className="text-center">
              <p className="text-lg font-bold text-slate-800">B+</p>
              <p className="text-xs text-slate-400 font-medium">Blood</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Cards */}
      <section className="grid grid-cols-1 gap-4">
        <div className="card p-6 flex flex-col gap-4">
           <h3 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-widest text-[10px]">Contact Information</h3>
           <div className="flex items-center gap-4 text-slate-600">
             <div className="p-3 bg-slate-50 rounded-xl"><Phone size={18} /></div>
             <div>
               <p className="text-xs text-slate-400 font-medium">Phone</p>
               <p className="font-bold text-sm">{userData?.phone || 'Not provided'}</p>
             </div>
           </div>
           <div className="flex items-center gap-4 text-slate-600">
             <div className="p-3 bg-slate-50 rounded-xl"><Mail size={18} /></div>
             <div>
               <p className="text-xs text-slate-400 font-medium">Email</p>
               <p className="font-bold text-sm">{userData?.email || 'Not provided'}</p>
             </div>
           </div>
           <div className="flex items-center gap-4 text-slate-600">
             <div className="p-3 bg-slate-50 rounded-xl"><MapPin size={18} /></div>
             <div>
               <p className="text-xs text-slate-400 font-medium">Address</p>
               <p className="font-bold text-sm">{userData?.address?.full || 'Complete profile'}</p>
             </div>
           </div>
        </div>
      </section>

      {/* Settings Menu */}
      <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {menuItems.map((item, i) => (
          <button 
            key={i} 
            className="w-full flex items-center justify-between p-6 hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-0 group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${item.color}`}>
                {item.icon}
              </div>
              <span className="font-bold text-slate-700">{item.label}</span>
            </div>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-primary-600 transition-colors" />
          </button>
        ))}
      </section>

      {/* Logout button */}
      <button 
        onClick={() => auth.signOut()}
        className="w-full flex items-center justify-center gap-3 p-5 bg-red-50 text-red-600 rounded-3xl font-bold hover:bg-red-100 transition-all mb-12"
      >
        <LogOut size={20} />
        Log Out from DentIQ
      </button>
    </div>
  );
};

export default PatientProfile;
