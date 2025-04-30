import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className="fixed top-0 w-full flex justify-between items-center px-8 py-4 bg-black bg-opacity-60 backdrop-blur-md z-50">
        <h1 className="text-xl font-bold tracking-wide text-white">RoadMap.io</h1>
        <nav className="space-x-6">
        <a href="#features" className="hover:text-blue-400 transition">Navigate</a>
        <Link to ="/path" className = "hover:text-blue-400 transition">Path</Link>
        <a href="#contact" className="hover:text-blue-400 transition">Add your Journey</a>
        </nav>
  </header>
  )
}

export default Navbar