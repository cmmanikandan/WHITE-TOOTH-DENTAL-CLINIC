import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardLayout from './layouts/DashboardLayout';
import PatientLayout from './layouts/PatientLayout';

// Pages (to be created)
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import ReceptionDashboard from './pages/reception/Dashboard';
import PatientRegistration from './pages/reception/PatientRegistration';
import DoctorDashboard from './pages/doctor/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import StaffManagement from './pages/admin/StaffManagement';
import PatientDashboard from './pages/patient/Dashboard';
import PatientProfile from './pages/patient/Profile';
import { useAuth } from './context/AuthContext';

function App() {

  return (
    <>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Landing />} />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
          <Route element={<DashboardLayout allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<StaffManagement />} />
            <Route path="/admin/audit" element={<div>Audit Logs</div>} />
            <Route path="/admin/settings" element={<div>Settings</div>} />
          </Route>

          {/* Reception Routes */}
          <Route element={<DashboardLayout allowedRoles={['reception', 'admin']} />}>
            <Route path="/reception" element={<ReceptionDashboard />} />
            <Route path="/reception/register" element={<PatientRegistration />} />
            <Route path="/reception/appointments" element={<div>Appointments</div>} />
            <Route path="/reception/queue" element={<div>Token Queue</div>} />
          </Route>

          {/* Doctor Routes */}
          <Route element={<DashboardLayout allowedRoles={['doctor', 'admin']} />}>
            <Route path="/doctor" element={<DoctorDashboard />} />
            <Route path="/doctor/history" element={<div>Patient History</div>} />
          </Route>

          {/* Patient Routes */}
          <Route element={<PatientLayout />}>
            <Route path="/patient" element={<PatientDashboard />} />
            <Route path="/patient/appointments" element={<div>My Appointments</div>} />
            <Route path="/patient/prescriptions" element={<div>My Prescriptions</div>} />
            <Route path="/patient/profile" element={<PatientProfile />} />
            <Route path="/patient/notifications" element={<div>Notifications</div>} />
          </Route>

          {/* Redirects */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
