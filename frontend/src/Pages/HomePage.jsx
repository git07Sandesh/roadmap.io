import React from 'react'
import { motion } from "framer-motion";
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

const HomePage = () => {
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      {/* Header */}
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Features Section */}
      <section id="features" className="py-20 px-6 md:px-20">
        <h3 className="text-3xl font-bold text-center mb-10">Features</h3>
        <div className="grid md:grid-cols-3 gap-10">
          {['Minimal Design', 'Fast Performance', 'Responsive Layout'].map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              className="bg-gray-900 rounded-xl p-6 hover:scale-105 transition"
            >
              <h4 className="text-xl font-semibold text-blue-400 mb-2">{feature}</h4>
              <p className="text-gray-400 text-sm">Experience simplicity with elegance and speed across all devices.</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
    <Contact />

      {/* Footer */}
      <Footer />
    </main>
  )
}

export default HomePage