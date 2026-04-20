import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart2, 
  Users, 
  Calendar, 
  ClipboardList, 
  UserPlus, 
  Settings, 
  LogOut,
  Activity
} from 'lucide-react';
import { auth } from '../firebase/config';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { userData, isAdmin, isDoctor, isReception } = useAuth();

  const adminLinks = [
    { to: '/admin', icon: <BarChart2 size={20} />, label: 'Analytics' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Manage Staff' },
    { to: '/admin/audit', icon: <Activity size={20} />, label: 'Audit Logs' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const doctorLinks = [
    { to: '/doctor', icon: <Calendar size={20} />, label: 'Today Queue' },
    { to: '/doctor/history', icon: <ClipboardList size={20} />, label: 'Patient History' },
  ];

  const receptionLinks = [
    { to: '/reception', icon: <BarChart2 size={20} />, label: 'Dashboard' },
    { to: '/reception/register', icon: <UserPlus size={20} />, label: 'New Patient' },
    { to: '/reception/appointments', icon: <Calendar size={20} />, label: 'Appointments' },
    { to: '/reception/queue', icon: <ClipboardList size={20} />, label: 'Token Queue' },
  ];

  const links = isAdmin ? adminLinks : isDoctor ? doctorLinks : receptionLinks;

  return (
    <div className="w-64 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 hidden md:flex">
      <div className="p-6">
        <div className="flex items-center">
          <img src="/white-tooth-logo-horizontal.svg" alt="White Tooth Dental Clinic" className="w-full h-auto max-w-[220px]" />
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-4 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                ? 'bg-primary-50 text-primary-600 font-semibold' 
                : 'text-slate-600 hover:bg-slate-50'
              }`
            }
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <div className="flex items-center gap-3 px-4 py-3 text-slate-600">
          <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
            {userData?.name?.charAt(0)}
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-semibold truncate">{userData?.name}</p>
            <p className="text-xs text-slate-400 capitalize">{userData?.role}</p>
          </div>
        </div>
        <button 
          onClick={() => auth.signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 mt-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
