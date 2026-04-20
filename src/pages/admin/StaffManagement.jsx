import React, { useState } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Shield, 
  Mail, 
  Phone, 
  MoreVertical,
  Check,
  X,
  Loader2
} from 'lucide-react';
import { db, auth } from '../../firebase/config';
import { collection, query, getDocs, setDoc, doc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';

const StaffManagement = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [staff, setStaff] = useState([
    { id: 1, name: 'Dr. Sarah Wilson', role: 'doctor', email: 'sarah@dentiq.com', phone: '+91 9876543210', status: 'Active' },
    { id: 2, name: 'Jane Cooper', role: 'reception', email: 'jane@dentiq.com', phone: '+91 9876543211', status: 'Active' },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'doctor',
    password: ''
  });

  const handleAddStaff = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // In a real app, you'd use a cloud function to create users without logging out
      // For this demo, we'll simulate the UI
      const newStaff = {
        ...formData,
        id: Date.now(),
        status: 'Active'
      };
      
      setStaff([...staff, newStaff]);
      setShowAddModal(false);
      toast.success('Staff member added successfully!');
    } catch (err) {
      toast.error('Failed to add staff');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Staff Management</h2>
          <p className="text-slate-500">Manage clinical and administrative team members.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <UserPlus size={18} />
          Add Staff Member
        </button>
      </div>

      <div className="card overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input className="input-field pl-10" placeholder="Search by name, role or email..." />
          </div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Contact</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {staff.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-primary-100 text-primary-600 flex items-center justify-center font-bold">
                        {s.name.charAt(4)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      s.role === 'doctor' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                    }`}>
                      {s.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-slate-600">{s.email}</p>
                    <p className="text-xs text-slate-400">{s.phone}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-500 uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                      {s.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-300 hover:text-slate-600 rounded-lg">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-800">Add Staff Member</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-slate-50 rounded-xl text-slate-400"
              >
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddStaff} className="p-8 space-y-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                <input 
                  required
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field" 
                  placeholder="e.g. Dr. John Doe" 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Role</label>
                  <select 
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="input-field"
                  >
                    <option value="doctor">Doctor</option>
                    <option value="reception">Receptionist</option>
                    <option value="admin">System Admin</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Initial Password</label>
                  <input 
                    type="password"
                    required
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="input-field" 
                    placeholder="••••••••" 
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Email Address</label>
                <input 
                  type="email"
                  required
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="input-field" 
                  placeholder="name@dentiq.com" 
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Phone Number</label>
                <input 
                  required
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="input-field" 
                  placeholder="+91 00000 00000" 
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </button>
                <button 
                  disabled={loading}
                  type="submit"
                  className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2"
                >
                  {loading ? <Loader2 className="animate-spin" size={20} /> : <Check size={20} />}
                  Confirm Addition
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StaffManagement;
