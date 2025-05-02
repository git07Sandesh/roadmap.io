

import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { useState } from 'react'
const PathPage = () => {
  const [userText, setUserText] = useState("");

  return (
    <div className="min-h-screen bg-black text-white font-sans">
    <Navbar />
    <section className="flex flex-col justify-center items-center text-center h-screen px-4">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="text-5xl md:text-7xl font-bold mb-4"
    >
      What do you want to be <span className="text-blue-400">Today.</span>
    </motion.h2>
    <motion.p 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ delay: 0.5 }}
      className="text-lg text-gray-400 max-w-xl mb-8"
    >
      Find an easiest path to your journey!
    </motion.p>
    <input
     type='text'
     onChange={(e) => setUserText(e.target.value)}
     value={userText}
    className="bg-green-100 px-6 py-3 rounded-2xl font-semibold text-black hover:bg-blue-400 transition"
    placeholder='Enter your Target' />
    <button className="bg-blue-500 px-6 py-3 m-3 rounded-full font-semibold text-black hover:bg-blue-400 transition">Search</button>
    {userText}
  </section>
    <Footer />
    </div>
  )
}

export default PathPage










// import React, { useCallback, useState } from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'
// import ReactFlow, { useEdgesState, useNodesState, Background } from 'reactflow'
// import 'reactflow/dist/style.css';



// const initialNodes = [
//   { id: 'arrays', position: { x: 250, y: 0 }, data: { label: 'Arrays' }, type: 'default' },
//   { id: 'two', position: { x: 100, y: 100 }, data: { label: 'Two Pointers' } },
//   { id: 'stack', position: { x: 400, y: 100 }, data: { label: 'Stack' } },
//   { id: 'queue', position: { x: 600, y: 100 }, data: { label: 'Queue' } },
// ];

// const allEdges = [
//   { id: 'e1', source: 'arrays', target: 'two' },
//   { id: 'e2', source: 'arrays', target: 'stack' },
//   { id: 'e3', source: 'two', target: 'Queue' },
//   { id: 'e4', source: 'stack', target: 'two' },
// ];

// const PathPage = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [visibleEdges, setVisibleEdges] = useEdgesState(allEdges); // initially show all
//   const [collapsedParents, setCollapsedParents] = useState({});

//   const handleNodeClick = useCallback((event, node) => {
//     const nodeId = node.id;
//     const isCollapsed = collapsedParents[nodeId];

//     // Toggle collapsed state
//     const updatedCollapsed = {
//       ...collapsedParents,
//       [nodeId]: !isCollapsed,
//     };
//     setCollapsedParents(updatedCollapsed);

//     // Update edges: filter out or restore based on collapse state
//     const updatedEdges = isCollapsed
//       ? [...visibleEdges, ...allEdges.filter(e => e.source === nodeId && !visibleEdges.find(v => v.id === e.id))]
//       : visibleEdges.filter(e => e.source !== nodeId);

//     setVisibleEdges(updatedEdges);
//   }, [collapsedParents, visibleEdges]);

//   return (
//     <div className="min-h-screen bg-black text-white font-sans">
//       <Navbar />
      

//       <div style={{ height: '100vh' }}>
//       <ReactFlow
//         nodes={nodes}
//         edges={visibleEdges}
//         onNodesChange={onNodesChange}
//         onNodeClick={handleNodeClick}
//         fitView
//       >
//         <Background />
//       </ReactFlow>
//      </div>


//       <Footer />
//     </div>
//   )
// }

// export default PathPage