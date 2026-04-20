import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Calendar, 
  FileText, 
  User,
  Bell
} from 'lucide-react';

const BottomNav = () => {
  return (
    <div className="md:hidden fixed bottom-6 left-4 right-4 bg-white/80 backdrop-blur-lg border border-slate-200/50 shadow-2xl rounded-2xl p-2 flex justify-around items-center z-50">
      <NavLink
        to="/patient"
        end
        className={({ isActive }) => 
          `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            isActive ? 'text-primary-600 bg-primary-50' : 'text-slate-400'
          }`
        }
      >
        <Home size={24} />
        <span className="text-[10px] font-medium">Home</span>
      </NavLink>
      
      <NavLink
        to="/patient/appointments"
        className={({ isActive }) => 
          `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            isActive ? 'text-primary-600 bg-primary-50' : 'text-slate-400'
          }`
        }
      >
        <Calendar size={24} />
        <span className="text-[10px] font-medium">Book</span>
      </NavLink>
      
      <NavLink
        to="/patient/prescriptions"
        className={({ isActive }) => 
          `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            isActive ? 'text-primary-600 bg-primary-50' : 'text-slate-400'
          }`
        }
      >
        <FileText size={24} />
        <span className="text-[10px] font-medium">Records</span>
      </NavLink>
      
      <NavLink
        to="/patient/notifications"
        className={({ isActive }) => 
          `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            isActive ? 'text-primary-600 bg-primary-50' : 'text-slate-400'
          }`
        }
      >
        <Bell size={24} />
        <span className="text-[10px] font-medium">Alerts</span>
      </NavLink>
      
      <NavLink
        to="/patient/profile"
        className={({ isActive }) => 
          `flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            isActive ? 'text-primary-600 bg-primary-50' : 'text-slate-400'
          }`
        }
      >
        <User size={24} />
        <span className="text-[10px] font-medium">Profile</span>
      </NavLink>
    </div>
  );
};

export default BottomNav;
