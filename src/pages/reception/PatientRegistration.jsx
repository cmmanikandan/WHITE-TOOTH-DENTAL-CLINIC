import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Activity, 
  Clipboard, 
  Save, 
  ArrowLeft,
  Loader2,
  CheckCircle,
  Hash
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../../firebase/config';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [createdPatient, setCreatedPatient] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'male',
    address: '',
    village: '',
    district: '',
    state: '',
    pin: '',
    medicalNotes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Auto-generate Patient ID
      const patientId = 'PAT-' + Math.floor(100000 + Math.random() * 900000);
      
      // We don't automatically create a firebase AUTH user here by default in this flow (Reception adds patient)
      // BUT we should save details to 'patients' collection
      const patientData = {
        ...formData,
        patientId,
        createdAt: new Date().toISOString(),
        role: 'patient'
      };

      const docRef = await addDoc(collection(db, 'patients'), patientData);
      
      setCreatedPatient({ ...patientData, id: docRef.id });
      setSuccess(true);
      toast.success('Patient Registered Successfully!');
    } catch (err) {
      toast.error('Failed to register patient: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center p-8 bg-white rounded-[3rem] shadow-2xl shadow-primary-50">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
          <CheckCircle size={48} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Patient Registered!</h2>
        <p className="text-slate-500 mb-8">Identification details have been generated.</p>
        
        <div className="w-full bg-slate-50 rounded-3xl p-8 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px]">Patient Name</span>
            <span className="font-bold text-slate-800">{createdPatient?.name}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px]">Patient ID</span>
            <span className="font-mono font-bold text-primary-600 text-lg">{createdPatient?.patientId}</span>
          </div>
          <div className="flex justify-between items-center border-b border-slate-200 pb-4">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest text-[10px]">Phone Number</span>
            <span className="font-bold text-slate-800">{createdPatient?.phone}</span>
          </div>
        </div>

        <div className="flex gap-4 w-full">
          <button onClick={() => setSuccess(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all">
            Add Another
          </button>
          <button onClick={() => navigate('/reception')} className="flex-1 btn-primary py-4">
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-primary-600 hover:shadow-lg transition-all">
          <ArrowLeft size={20} />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Register New Patient</h2>
          <p className="text-slate-500 text-sm font-medium">Create a new clinical record for a patient.</p>
        </div>
      </div>

      <form onSubmit={handleRegister} className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Section 1: Basic Info */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-3 border-b border-slate-50 pb-4 mb-2">
              <div className="p-2 bg-blue-50 text-blue-500 rounded-lg"><User size={18} /></div>
              Basic Information
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Full Name</label>
                <input name="name" onChange={handleChange} required className="input-field" placeholder="Full name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Age</label>
                  <input type="number" name="age" onChange={handleChange} required className="input-field" placeholder="25" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Gender</label>
                  <select name="gender" onChange={handleChange} className="input-field">
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3 text-slate-300" size={18} />
                  <input name="phone" type="tel" onChange={handleChange} required className="input-field pl-12" placeholder="+91" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Email Address (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3 text-slate-300" size={18} />
                  <input name="email" type="email" onChange={handleChange} className="input-field pl-12" placeholder="email@example.com" />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Address */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-3 border-b border-slate-50 pb-4 mb-2">
              <div className="p-2 bg-green-50 text-green-500 rounded-lg"><MapPin size={18} /></div>
              Address Details
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Village/Area</label>
                  <input name="village" onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">District</label>
                  <input name="district" onChange={handleChange} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">State</label>
                  <input name="state" onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Pincode</label>
                  <input name="pin" onChange={handleChange} className="input-field" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Full Locality Details</label>
                <textarea name="address" onChange={handleChange} className="input-field h-24 resize-none p-4" placeholder="Street, landmarks..."></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Medical Notes */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-bold text-slate-800 flex items-center gap-3 border-b border-slate-50 pb-4 mb-2">
            <div className="p-2 bg-orange-50 text-orange-500 rounded-lg"><Activity size={18} /></div>
            Clinical Information
          </h3>
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Initial Medical Notes / History</label>
            <textarea name="medicalNotes" onChange={handleChange} className="input-field h-32 resize-none p-4 font-medium" placeholder="Previous conditions, allergies, or reasons for visit..."></textarea>
          </div>
        </div>

        <div className="flex gap-6 pb-12">
          <button type="button" onClick={() => navigate(-1)} className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors">
            Discard
          </button>
          <button disabled={loading} type="submit" className="flex-[2] btn-primary py-4 flex items-center justify-center gap-3 shadow-2xl">
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
            Register & Create Token
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientRegistration;
