import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import { auth } from '../firebase/config';

const PatientLayout = () => {
  const { userData, loading, role } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50">
      <div className="animate-pulse w-32">
        <img src="/white-tooth-logo-icon.svg" alt="White Tooth Dental Clinic" className="w-full h-auto" />
      </div>
    </div>
  );
  
  if (!userData) return <Navigate to="/login" />;
  if (role !== 'patient' && role !== 'admin') return <Navigate to="/" />;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pb-24 md:pb-0">
      {/* Patient Header */}
      <header className="bg-white border-b border-slate-100 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/white-tooth-logo-horizontal.svg" alt="White Tooth Dental Clinic" className="h-10 w-auto max-w-[220px]" />
          </div>
          <button 
            onClick={() => auth.signOut()}
            className="text-slate-400 p-2 hover:bg-slate-50 rounded-xl transition-all"
          >
            <LogOut size={20} />
          </button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-4xl mx-auto p-6">
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
};

export default PatientLayout;
