import React from 'react';
import { Link } from 'react-router-dom';
import fullLogo from '../full logo.jpeg';
import { 
  ShieldCheck, 
  Clock,
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  Smile,
  Heart,
  Calendar,
  CheckCircle2,
  AtSign,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import { motion } from 'framer-motion';

const Landing = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const services = [
    { title: 'Oral Checkups', desc: 'Comprehensive dental examinations and diagnostics.', icon: <span className="font-bold text-lg">01</span> },
    { title: 'Orthodontics', desc: 'Modern braces and clear aligners for a perfect smile.', icon: <Smile size={24} /> },
    { title: 'Teeth Whitening', desc: 'Advanced professional whitening for a brighter smile.', icon: <ShieldCheck size={24} /> },
    { title: 'Emergency Care', desc: '24/7 emergency dental services for pain relief.', icon: <Heart size={24} /> },
  ];

  const clinicDetails = [
    { label: 'Instagram', value: '@white.tooth.dental', icon: <AtSign size={18} />, href: 'https://instagram.com/' },
    { label: 'WhatsApp', value: '+91 98765 43210', icon: <MessageCircle size={18} />, href: 'https://wa.me/919876543210' },
    { label: 'Address', value: '12/A Medical Square, Downtown City', icon: <MapPin size={18} /> },
    { label: 'Opening Hours', value: 'Mon-Sat, 9:00 AM - 8:00 PM', icon: <Clock size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={fullLogo} alt="White Tooth Dental Clinic" className="h-12 w-12 rounded-full object-cover" />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-slate-600 font-bold text-sm">
            <a href="#home" className="hover:text-primary-600 transition-colors">Home</a>
            <a href="#services" className="hover:text-primary-600 transition-colors">Services</a>
            <a href="#about" className="hover:text-primary-600 transition-colors">About</a>
            <a href="#contact" className="hover:text-primary-600 transition-colors">Contact</a>
            <Link to="/login" className="px-6 py-2 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all shadow-lg shadow-primary-200">
              Get Started
            </Link>
          </div>

          <button className="md:hidden text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} /> }
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 px-6 py-4 space-y-4 shadow-xl">
            <a href="#home" className="block text-slate-600 font-bold">Home</a>
            <a href="#services" className="block text-slate-600 font-bold">Services</a>
            <a href="#about" className="block text-slate-600 font-bold">About</a>
            <a href="#contact" className="block text-slate-600 font-bold">Contact</a>
            <Link to="/login" className="block w-full py-3 bg-primary-600 text-white text-center rounded-xl font-bold">Login</Link>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-50 text-primary-600 rounded-full text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></span>
              Best Dental Clinic in Town
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1]">
              A Smarter Way to <span className="text-primary-600">Perfect</span> Smiles.
            </h1>
            <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
              Manage your dental health with ease. Book appointments, access prescriptions, and chat with your doctor — all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="px-10 py-5 bg-primary-600 text-white rounded-2xl font-bold text-lg hover:bg-primary-700 transition-all shadow-2xl shadow-primary-200 flex items-center justify-center gap-2 group">
                Register as Patient
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/login" className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-100 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all flex items-center justify-center">
                Medical Staff Login
              </Link>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500">U{i}</div>
                ))}
              </div>
              <p className="text-slate-400 text-sm font-medium">Joined by <span className="text-slate-900 font-bold">1,200+</span> patients this month</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl">
               <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1000" alt="Clinic" className="w-full h-full object-cover" />
            </div>
            {/* Floating cards */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl z-20 border border-slate-50 hidden sm:block">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-2xl"><Calendar size={24} /></div>
                <div>
                  <p className="font-bold text-slate-800 text-lg">Next Appointment</p>
                  <p className="text-xs text-slate-400 font-medium tracking-wide">TODAY, 10:30 AM</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50 px-6">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-slate-900">Premium Care Facilities</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We provide the most innovative dental treatments using state-of-the-art technology and a patient-centric approach.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((s, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-slate-900">Why choose DentIQ?</h2>
              <p className="text-xl text-slate-500 leading-relaxed">We combine medical expertise with cutting-edge software to give you the most transparent and efficient clinical experience.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                'Expert Clinical Doctors',
                'Digital Prescriptions',
                'No Waiting Queues',
                'Smart Notifications',
              ].map(item => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary-600" size={20} />
                  <span className="font-bold text-slate-700">{item}</span>
                </div>
              ))}
            </div>
            <button className="text-primary-600 font-bold flex items-center gap-2 group">
              Learn more about our process
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6 pt-12">
               <div className="rounded-3xl overflow-hidden shadow-xl"><img src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=500" alt="About" /></div>
               <div className="bg-primary-600 p-8 rounded-3xl text-white">
                  <p className="text-4xl font-bold mb-1">15+</p>
                  <p className="text-sm font-medium text-primary-100 uppercase tracking-widest">Experience Years</p>
               </div>
            </div>
            <div className="space-y-6">
               <div className="bg-slate-900 p-8 rounded-3xl text-white">
                  <p className="text-4xl font-bold mb-1">99.9%</p>
                  <p className="text-sm font-medium text-slate-400 uppercase tracking-widest">Success Rate</p>
               </div>
               <div className="rounded-3xl overflow-hidden shadow-xl"><img src="https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=500" alt="About 2" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white px-6 rounded-[4rem] mx-6 mb-12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div className="space-y-4">
              <h2 className="text-5xl font-bold">Let's solve your <br />dental problems.</h2>
              <p className="text-slate-400 text-lg">Reach out to our experts or visit our clinic for a walk-in consultation.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {clinicDetails.map((detail) => {
                const content = (
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-5 hover:bg-white/10 transition-colors h-full">
                    <div className="flex items-center gap-3 mb-3 text-primary-400">
                      {detail.icon}
                      <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">{detail.label}</span>
                    </div>
                    <p className="text-lg font-semibold leading-snug">{detail.value}</p>
                  </div>
                );

                return detail.href ? (
                  <a key={detail.label} href={detail.href} target="_blank" rel="noreferrer">
                    {content}
                  </a>
                ) : (
                  <div key={detail.label}>{content}</div>
                );
              })}
            </div>
            <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-6 items-stretch">
              <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 space-y-4">
                <div className="flex items-center gap-3 text-primary-400">
                  <MapPin size={22} />
                  <h3 className="text-lg font-bold">Find us on the map</h3>
                </div>
                <p className="text-slate-400">
                  12/A Medical Square, Downtown City. Easy parking, lift access, and walk-in support available.
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=12%2FA%20Medical%20Square%2C%20Downtown%20City"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-white text-slate-900 font-bold hover:bg-slate-100 transition-colors"
                >
                  Open in Google Maps
                  <ArrowRight size={18} />
                </a>
              </div>
              <div className="bg-primary-600 rounded-[2rem] p-6 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-primary-100 mb-2">Need a quick reply?</p>
                  <p className="text-2xl font-bold leading-tight">Message us on WhatsApp for fast booking support.</p>
                </div>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-2xl bg-white text-primary-700 font-bold hover:bg-primary-50 transition-colors w-fit"
                >
                  Chat on WhatsApp
                  <ArrowRight size={18} />
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] text-slate-900 border border-white/10 shadow-2xl">
             <h3 className="text-2xl font-bold mb-8 text-center uppercase tracking-widest text-[12px] text-slate-400">Quick Inquiry</h3>
             <form className="space-y-6">
               <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 focus:ring-2 focus:ring-primary-600 focus:outline-none" placeholder="Your Name" />
               <input className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 focus:ring-2 focus:ring-primary-600 focus:outline-none" placeholder="Email Address" />
               <textarea className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 h-32 resize-none focus:ring-2 focus:ring-primary-600 focus:outline-none" placeholder="How can we help?"></textarea>
               <button className="w-full btn-primary py-5 text-lg">Send Message</button>
             </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-6">
            <img src={fullLogo} alt="White Tooth Dental Clinic" className="h-20 w-20 rounded-full object-cover" />
          </div>
          <p className="text-slate-400 text-sm font-medium">© 2024 White Tooth Dental Clinic. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
