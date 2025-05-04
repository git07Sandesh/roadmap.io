import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const HeroSection = () => {
  return (
    <section className="flex flex-col justify-center items-center text-center h-screen px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="text-5xl md:text-7xl font-bold mb-4"
    >
      Your <span className="text-blue-400">Path</span>, Made Easier.
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 0.5 }}
      className="text-lg text-gray-400 max-w-xl mb-8"
    >
      A sleek, modern interface to preview your journey.
    </motion.p>
    <Link to ="/path" className="bg-blue-500 px-6 py-3 rounded-full font-semibold text-black hover:bg-blue-400 transition">
        Find your Path
    </Link>
  </section>
  )
}

export default HeroSection