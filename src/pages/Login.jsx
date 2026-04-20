import React, { useState } from 'react';
import fullLogo from '../full logo.jpeg';
import { 
  signInWithEmailAndPassword, 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { useNavigate, Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-hot-toast';
import { Mail, Phone, Lock, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [usePhone, setUsePhone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const navigate = useNavigate();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check role and navigate
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const patientDoc = await getDoc(doc(db, 'patients', user.uid));
      
      const role = userDoc.exists() ? userDoc.data().role : patientDoc.exists() ? 'patient' : null;
      
      if (role === 'admin') navigate('/admin');
      else if (role === 'doctor') navigate('/doctor');
      else if (role === 'reception') navigate('/reception');
      else if (role === 'patient') navigate('/patient');
      else toast.error('Account found but no role assigned.');
      
      toast.success('Welcome back!');
    } catch (error) {
      toast.error('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setupRecaptcha();
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setShowOtp(true);
      toast.success('OTP sent to your phone');
    } catch (error) {
      toast.error('Failed to send OTP');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;
      
      // Check role and navigate (similar to email login)
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const patientDoc = await getDoc(doc(db, 'patients', user.uid));
      
      const role = userDoc.exists() ? userDoc.data().role : patientDoc.exists() ? 'patient' : null;
      
      if (role === 'admin') navigate('/admin');
      else if (role === 'doctor') navigate('/doctor');
      else if (role === 'reception') navigate('/reception');
      else if (role === 'patient') navigate('/patient');
      else toast.error('Account found but no role assigned.');
      
      toast.success('Verified successfully');
    } catch (error) {
      toast.error('Invalid OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div id="recaptcha-container"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors mb-6">
          <ArrowLeft size={16} />
          Back to home
        </Link>

        <div className="text-center mb-8 space-y-3">
          <img src={fullLogo} alt="WHITE TOOTH DENTAL CLINIC" className="mx-auto w-24 h-24 rounded-full object-cover mb-3" />
          <h1 className="text-2xl font-bold text-slate-900">WHITE TOOTH DENTAL CLINIC</h1>
          <p className="text-primary-600 font-semibold italic text-sm">Gentle Hands. Strong Results.</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button 
              onClick={() => {setUsePhone(false); setShowOtp(false);}}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${!usePhone ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'}`}
            >
              Email
            </button>
            <button 
              onClick={() => setUsePhone(true)}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${usePhone ? 'bg-white text-primary-600 shadow-sm' : 'text-slate-500'}`}
            >
              Phone
            </button>
          </div>

          {!usePhone ? (
            <form onSubmit={handleEmailLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-field pl-12" 
                    placeholder="name@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field pl-12" 
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
              <button disabled={loading} type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Login'}
                <ArrowRight size={20} />
              </button>
            </form>
          ) : !showOtp ? (
            <form onSubmit={handlePhoneLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-field pl-12" 
                    placeholder="+91 9876543210"
                    required
                  />
                </div>
              </div>
              <button disabled={loading} type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
               {loading ? <Loader2 className="animate-spin" size={20} /> : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Verification Code</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                  <input 
                    type="text" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="input-field pl-12" 
                    placeholder="Enter 6-digit OTP"
                    required
                  />
                </div>
              </div>
              <button disabled={loading} type="submit" className="btn-primary w-full flex items-center justify-center gap-2 py-4">
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Verify & Continue'}
              </button>
              <button 
                type="button" 
                onClick={() => setShowOtp(false)}
                className="w-full text-center text-sm font-semibold text-slate-400 hover:text-primary-600 transition-colors"
              >
                Change Phone Number
              </button>
            </form>
          )}

          <div className="mt-8 pt-8 border-t border-slate-50 text-center">
            <p className="text-slate-500 text-sm">
              Don't have an account? {' '}
              <Link to="/register" className="text-primary-600 font-bold hover:underline">
                Register as Patient
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
