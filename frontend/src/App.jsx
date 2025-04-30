import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './Pages/HomePage'
import PathPage from './Pages/PathPage'


const App = () => {
  return (
   <Routes>
      <Route path = "/" element = {<HomePage />} />
      <Route path = "/path" element = {<PathPage />} />
   </Routes>
    
  )
}

export default App