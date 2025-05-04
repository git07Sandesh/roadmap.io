import React, { useCallback, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { fetchPathGraph } from '../store/dataStore';
import ReactFlow, {
  useEdgesState,
  useNodesState,
  Background
} from 'reactflow';
import 'reactflow/dist/style.css';

const PathPage = () => {
  const [userText, setUserText] = useState('');
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [collapsedParents, setCollapsedParents] = useState({});
  const [showGraph, setShowGraph] = useState(false);

  const handleSearch = async () => {
    if (!userText.trim()) return;

    const data = await fetchPathGraph(userText.trim());
    if (!data) return;

    // Create positioned, non-draggable nodes
    const positionedNodes = data.nodes.map((node, index) => ({
      id: node.id,
      position: {
        x: 200 * (index % 5),
        y: Math.floor(index / 5) * 120
      },
      data: { label: node.label },
      type: 'default',
      draggable: false,
      selectable: false
    }));

    const formattedEdges = data.edges.map((edge, index) => ({
      id: `e-${edge.from}-${edge.to}-${index}`,
      source: edge.from,
      target: edge.to
    }));

    setNodes(positionedNodes);
    setEdges(formattedEdges);
    setShowGraph(true);
  };

  const handleNodeClick = useCallback(
    (event, node) => {
      const nodeId = node.id;
      const isCollapsed = collapsedParents[nodeId];

      const updatedCollapsed = {
        ...collapsedParents,
        [nodeId]: !isCollapsed
      };
      setCollapsedParents(updatedCollapsed);

      const updatedEdges = isCollapsed
        ? [...edges, ...edges.filter(e => e.source === nodeId && !edges.find(v => v.id === e.id))]
        : edges.filter(e => e.source !== nodeId);

      setEdges(updatedEdges);
    },
    [collapsedParents, edges]
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />

      {/* Hero Section */}
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
          type="text"
          onChange={(e) => setUserText(e.target.value)}
          value={userText}
          className="bg-green-100 px-6 py-3 rounded-2xl font-semibold text-black"
          placeholder="Enter your Target"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 px-6 py-3 m-3 rounded-full font-semibold text-black hover:bg-blue-400 transition"
        >
          Search
        </button>
      </section>

      {/* Graph Section */}
      {showGraph && (
  <div className="flex flex-col justify-center items-center w-auto h-[600px] overflow-auto border-t border-gray-700">

    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={handleNodeClick}
      panOnDrag={false}         // ❌ disable panning
      panOnScroll={false}       // ❌ disable trackpad scroll
      zoomOnScroll={true}       // ✅ enable scroll-to-zoom
      zoomOnPinch={true}        // ✅ enable pinch-to-zoom
      nodesDraggable={false}    // ❌ nodes stay fixed
      nodesConnectable={false}
      fitView
    >
      <Background />
    </ReactFlow>
  </div>
)}

      <Footer />
    </div>
  );
};

export default PathPage;
