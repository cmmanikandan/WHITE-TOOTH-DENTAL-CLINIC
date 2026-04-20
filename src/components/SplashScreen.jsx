import React from 'react';
import { motion } from 'framer-motion';
import fullLogo from '../full logo.jpeg';

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        className="w-40 sm:w-48 md:w-56 mb-8"
      >
        <img
          src={fullLogo}
          alt="White Tooth Dental Clinic"
          className="w-full h-auto block rounded-full object-cover"
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center"
      >
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">WhiteTooth Dental Clinic</h1>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Premium Dental Care</p>
      </motion.div>

      <div className="absolute bottom-12 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
        <motion.div 
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-full h-full bg-primary-600"
        />
      </div>
    </div>
  );
};

export default SplashScreen;
