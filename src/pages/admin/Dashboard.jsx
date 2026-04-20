import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  TrendingUp, 
  Activity, 
  Search, 
  Plus, 
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Calendar
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
  const data = [
    { name: 'Mon', visits: 12 },
    { name: 'Tue', visits: 19 },
    { name: 'Wed', visits: 15 },
    { name: 'Thu', visits: 22 },
    { name: 'Fri', visits: 30 },
    { name: 'Sat', visits: 10 },
    { name: 'Sun', visits: 5 },
  ];

  const revenueData = [
    { month: 'Jan', amount: 4000 },
    { month: 'Feb', amount: 3000 },
    { month: 'Mar', amount: 5000 },
    { month: 'Apr', amount: 4500 },
    { month: 'May', amount: 6000 },
    { month: 'Jun', amount: 7500 },
  ];

  const stats = [
    { label: 'Total Patients', value: '1,284', change: '+12%', up: true, icon: <Users className="text-blue-600" />, bg: 'bg-blue-50' },
    { label: 'Today Visits', value: '42', change: '+5%', up: true, icon: <UserCheck className="text-green-600" />, bg: 'bg-green-50' },
    { label: 'Revenue', value: '$12,450', change: '-2%', up: false, icon: <TrendingUp className="text-purple-600" />, bg: 'bg-purple-50' },
    { label: 'Active Staff', value: '14', change: '0%', up: true, icon: <Activity className="text-orange-600" />, bg: 'bg-orange-50' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Operational Analytics</h2>
          <p className="text-slate-500 font-medium">Monitoring clinic performance and staff activity.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-sm flex items-center gap-2 hover:bg-slate-50 transition-all">
            <Calendar size={18} />
            This Month
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm shadow-primary-100">
            <Plus size={18} />
            Manage Users
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="card p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.bg}`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                {stat.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{stat.value}</h3>
            <p className="text-sm font-semibold text-slate-400 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800">Weekly Patient Flow</h3>
            <select className="bg-slate-50 border-none text-xs font-bold text-slate-500 rounded-lg p-2 focus:ring-0">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                  dy={10}
                />
                <YAxis 
                   axisLine={false} 
                   tickLine={false} 
                   tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Bar dataKey="visits" fill="#0ea5e9" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-800">Revenue Overview</h3>
            <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <MoreVertical size={20} className="text-slate-400" />
            </button>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="amount" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity / Staff Table */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Clinical Staff</h3>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-2 text-slate-400" size={16} />
              <input className="bg-slate-50 border-none rounded-xl pl-9 py-2 text-sm focus:ring-1 focus:ring-primary-500 w-48" placeholder="Search staff..." />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                <th className="px-6 py-4">Employee</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Shift</th>
                <th className="px-6 py-4">Performance</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {[
                { name: 'Dr. Sarah Wilson', role: 'Cardiologist', shift: 'Morning', perf: 98, status: 'On Duty' },
                { name: 'Dr. Robert Fox', role: 'Orthodontist', shift: 'Full Day', perf: 92, status: 'On Duty' },
                { name: 'Jane Cooper', role: 'Reception', shift: 'Evening', perf: 95, status: 'Away' },
                { name: 'Cody Fisher', role: 'Doctor Assistant', shift: 'Morning', perf: 88, status: 'On Duty' },
              ].map((staff, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold text-xs">
                        {staff.name.charAt(4)}
                      </div>
                      <span className="font-bold text-slate-800 text-sm">{staff.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{staff.role}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">{staff.shift}</td>
                  <td className="px-6 py-4">
                    <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className="bg-primary-500 h-full" style={{width: `${staff.perf}%`}}></div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider ${
                      staff.status === 'On Duty' ? 'text-green-500' : 'text-orange-500'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${staff.status === 'On Duty' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-300 hover:text-slate-600 p-1">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
