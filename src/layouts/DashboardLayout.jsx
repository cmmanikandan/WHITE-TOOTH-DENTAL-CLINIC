import React from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { Menu, Bell } from 'lucide-react';
import navLogo from '../t.jpeg';

const DashboardLayout = ({ allowedRoles }) => {
  const { userData, loading, role } = useAuth();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;
  if (!userData) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(role)) return <Navigate to="/" />;

  return (
    <div className="flex min-h-screen bg-slate-50 w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between p-4 bg-white border-b border-slate-100 sticky top-0 z-40">
          <div className="flex items-center gap-2">
            <img src={navLogo} alt="WHITE TOOTH DENTAL CLINIC" className="h-10 w-10 rounded-full object-cover" />
            <span className="text-slate-900 font-bold\">WHITE TOOTH</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-slate-600 p-2 rounded-xl hover:bg-slate-50">
              <Bell size={20} />
            </button>
            <button className="text-slate-600 p-2 rounded-xl hover:bg-slate-50">
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-slate-100 sticky top-0 z-40">
          <h1 className="text-xl font-bold text-slate-800">
            {location.pathname === '/admin' ? 'Dashboard Overview' : 
             location.pathname.includes('/reception') ? 'Reception Management' : 'Doctor Portal'}
          </h1>
          <div className="flex items-center gap-6">
            <button className="relative text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800">{userData?.name}</p>
                <p className="text-xs text-slate-400 capitalize">{userData?.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                {userData?.name?.charAt(0)}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
