import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Clock, 
  ChevronRight, 
  Stethoscope, 
  FileText, 
  Pill, 
  Calendar,
  Activity,
  History,
  MoreVertical,
  Plus,
  Send
} from 'lucide-react';
import { db } from '../../firebase/config';
import { collection, query, where, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState('queue'); // queue, profile, history
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [diagnosis, setDiagnosis] = useState('');
  const [treatment, setTreatment] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', duration: '' }]);
  const [notes, setNotes] = useState('');
  const [followUp, setFollowUp] = useState('none');
  const [loading, setLoading] = useState(false);

  const mockQueue = [
    { id: 1, name: 'Alice Smith', age: 28, gender: 'Female', token: '001', status: 'waiting', type: 'Checkup' },
    { id: 2, name: 'Bob Wilson', age: 45, gender: 'Male', token: '002', status: 'waiting', type: 'Pain' },
    { id: 3, name: 'Charlie Davis', age: 32, gender: 'Male', token: '003', status: 'waiting', type: 'Root Canal' },
  ];

  const handleAddMedicine = () => {
    setMedicines([...medicines, { name: '', dosage: '', duration: '' }]);
  };

  const handleMedChange = (index, field, value) => {
    const updated = [...medicines];
    updated[index][field] = value;
    setMedicines(updated);
  };

  const handleSubmitConsultation = async () => {
    if (!selectedPatient) return;
    setLoading(true);
    try {
      // Create Treatment Record
      const treatmentData = {
        patientId: selectedPatient.id,
        doctorId: 'doc123', // Hardcoded for now
        date: new Date().toISOString(),
        diagnosis,
        treatment,
        notes,
        medicines,
        followUp
      };
      
      await addDoc(collection(db, 'treatments'), treatmentData);
      
      toast.success('Consultation completed!');
      setSelectedPatient(null);
      setActiveTab('queue');
      // Reset form
      setDiagnosis('');
      setTreatment('');
      setMedicines([{ name: '', dosage: '', duration: '' }]);
      setNotes('');
    } catch (err) {
      toast.error('Failed to save consultation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 pb-20">
      {/* Left Column: Queue */}
      <div className={`${selectedPatient ? 'hidden lg:block' : 'col-span-3 lg:col-span-1'} space-y-6`}>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <Activity className="text-primary-600" />
            Live Queue
          </h2>
          <span className="bg-primary-100 text-primary-600 px-3 py-1 rounded-full text-xs font-bold">
            3 Waiting
          </span>
        </div>

        <div className="space-y-4">
          {mockQueue.map((patient, i) => (
            <motion.button
              key={patient.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => {setSelectedPatient(patient); setActiveTab('profile');}}
              className={`w-full text-left p-5 rounded-3xl border transition-all ${
                selectedPatient?.id === patient.id 
                ? 'bg-primary-600 border-primary-600 text-white shadow-xl shadow-primary-200' 
                : 'bg-white border-slate-100 hover:border-primary-200 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md ${
                  selectedPatient?.id === patient.id ? 'bg-white/20' : 'bg-slate-100 text-slate-500'
                }`}>
                  Token #{patient.token}
                </span>
                <Clock size={16} className={selectedPatient?.id === patient.id ? 'opacity-50' : 'text-slate-300'} />
              </div>
              <h3 className="font-bold text-lg mb-1">{patient.name}</h3>
              <p className={`text-sm ${selectedPatient?.id === patient.id ? 'text-white/80' : 'text-slate-400'}`}>
                {patient.age}y • {patient.gender} • {patient.type}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right Column: Consultation Panel */}
      <div className={`${!selectedPatient ? 'hidden lg:flex' : 'col-span-3 lg:col-span-2'} flex flex-col min-h-[600px]`}>
        {selectedPatient ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden flex flex-col"
          >
            {/* Patient Mini Profile */}
            <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary-600 text-white flex items-center justify-center font-bold text-xl">
                  {selectedPatient.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-xl">{selectedPatient.name}</h3>
                  <p className="text-sm text-slate-500">History: 4 Visits • Last visit: 12 Mar 2024</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-600 transition-all">
                  <History size={20} />
                </button>
                <button className="p-3 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-600 transition-all">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>

            {/* Consultation Form */}
            <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Diagnosis</label>
                  <textarea 
                    value={diagnosis}
                    onChange={(e) => setDiagnosis(e.target.value)}
                    className="input-field h-24 resize-none p-4" 
                    placeholder="Enter diagnosis details..."
                  ></textarea>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Treatment Plan</label>
                  <textarea 
                    value={treatment}
                    onChange={(e) => setTreatment(e.target.value)}
                    className="input-field h-24 resize-none p-4" 
                    placeholder="Enter treatment plan..."
                  ></textarea>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Prescription</label>
                  <button 
                    onClick={handleAddMedicine}
                    className="text-xs font-bold text-primary-600 flex items-center gap-1 hover:bg-primary-50 px-2 py-1 rounded"
                  >
                    <Plus size={14} /> Add Medicine
                  </button>
                </div>
                <div className="space-y-3">
                  {medicines.map((med, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-3 animate-in fade-in slide-in-from-right-4 duration-300">
                      <div className="col-span-6">
                        <input 
                          value={med.name} 
                          onChange={(e) => handleMedChange(idx, 'name', e.target.value)}
                          className="input-field text-sm" 
                          placeholder="Medicine Name" 
                        />
                      </div>
                      <div className="col-span-3">
                        <input 
                          value={med.dosage} 
                          onChange={(e) => handleMedChange(idx, 'dosage', e.target.value)}
                          className="input-field text-sm" 
                          placeholder="Dosage (1-0-1)" 
                        />
                      </div>
                      <div className="col-span-3">
                        <input 
                          value={med.duration} 
                          onChange={(e) => handleMedChange(idx, 'duration', e.target.value)}
                          className="input-field text-sm" 
                          placeholder="5 Days" 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Additional Notes (Optional)</label>
                <textarea 
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-field h-20 resize-none p-4" 
                  placeholder="Private doctor notes..."
                ></textarea>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Follow-up</label>
                <div className="flex flex-wrap gap-3">
                  {['none', '1 day', '3 days', '1 week', 'custom'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setFollowUp(opt)}
                      className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                        followUp === opt 
                        ? 'bg-primary-600 border-primary-600 text-white shadow-lg shadow-primary-100' 
                        : 'bg-white border-slate-200 text-slate-500 hover:border-primary-300'
                      }`}
                    >
                      {opt.charAt(0).toUpperCase() + opt.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-4">
              <button 
                onClick={() => setSelectedPatient(null)}
                className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmitConsultation}
                disabled={loading}
                className="flex-[2] btn-primary py-4 flex items-center justify-center gap-2"
              >
                {loading ? <Activity className="animate-spin" size={20} /> : <Send size={20} />}
                Complete & Print
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-12 bg-white rounded-[2.5rem] border border-slate-100">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
              <Stethoscope size={48} className="text-slate-200" />
            </div>
            <h3 className="text-2xl font-bold text-slate-300 mb-2">No Patient Selected</h3>
            <p className="text-slate-400 max-w-xs">Select a patient from the queue to start consultation.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorDashboard;
