import React, { useState } from 'react';
import { 
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useNavigate, Link } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { User, Mail, Phone, Lock, MapPin, ArrowRight, Loader2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    age: '',
    gender: 'male',
    address: '',
    village: '',
    district: '',
    state: '',
    pin: '',
    medicalNotes: ''
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      console.log("Auth user created:", user.uid);
      
      const patientId = 'PAT-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      
      await updateProfile(user, { displayName: formData.name });
      
      // Save patient data
      const patientRef = doc(db, 'patients', user.uid);
      await setDoc(patientRef, {
        uid: user.uid,
        patientId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        age: formData.age,
        gender: formData.gender,
        address: {
          village: formData.village,
          district: formData.district,
          state: formData.state,
          pin: formData.pin,
          full: formData.address
        },
        medicalNotes: formData.medicalNotes,
        role: 'patient',
        createdAt: new Date().toISOString()
      });
      
      console.log("Firestore doc created");
      toast.success('Registration successful!');
      navigate('/patient');
    } catch (error) {
      console.error("Registration Error:", error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl w-full"
      >
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-slate-100 overflow-hidden">
          <div className="bg-primary-600 p-8 text-white text-center">
            <h1 className="text-3xl font-bold mb-2">New Patient</h1>
            <p className="text-primary-100">Join DentIQ for a smarter dental care experience</p>
          </div>
          
          <form onSubmit={handleRegister} className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Basic Info */}
              <div className="space-y-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2 mb-4">
                  <User size={18} className="text-primary-500" />
                  Personal Information
                </h3>
                
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3 text-slate-300" size={18} />
                    <input name="name" onChange={handleChange} required className="input-field pl-12" placeholder="John Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Age</label>
                    <input type="number" name="age" onChange={handleChange} required className="input-field" placeholder="25" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Gender</label>
                    <select name="gender" onChange={handleChange} className="input-field px-2">
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3 text-slate-300" size={18} />
                    <input name="phone" onChange={handleChange} required className="input-field pl-12" placeholder="+91 9876543210" />
                  </div>
                </div>
              </div>

              {/* Login Details */}
              <div className="space-y-6">
                <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2 mb-4">
                  <Lock size={18} className="text-primary-500" />
                  Security
                </h3>
                
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3 text-slate-300" size={18} />
                    <input type="email" name="email" onChange={handleChange} required className="input-field pl-12" placeholder="john@example.com" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-3 text-slate-300" size={18} />
                    <input type="password" name="password" onChange={handleChange} required className="input-field pl-12" placeholder="••••••••" />
                  </div>
                </div>
              </div>
            </div>

            {/* Address Details */}
            <div className="mt-10 space-y-6">
              <h3 className="font-bold text-slate-800 flex items-center gap-2 border-b pb-2 mb-4">
                <MapPin size={18} className="text-primary-500" />
                Address Details
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <input name="village" onChange={handleChange} required className="input-field" placeholder="Village / Area" />
                <input name="district" onChange={handleChange} required className="input-field" placeholder="District" />
                <input name="state" onChange={handleChange} required className="input-field" placeholder="State" />
                <input name="pin" onChange={handleChange} required className="input-field" placeholder="Pincode" />
              </div>
              <textarea name="address" onChange={handleChange} className="input-field h-20 resize-none py-3" placeholder="Locality / Landmark..."></textarea>
            </div>

            <button disabled={loading} type="submit" className="btn-primary w-full mt-10 py-4 text-lg shadow-2xl flex items-center justify-center gap-3">
              {loading ? (
                <Loader2 className="animate-spin" size={24} />
              ) : (
                <>
                  Register Now
                  <ArrowRight size={22} />
                </>
              )}
            </button>

            <p className="text-center text-slate-500 mt-6 text-sm font-medium">
              Already have an account? {' '}
              <Link to="/login" className="text-primary-600 font-bold hover:underline">
                Login here
              </Link>
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
