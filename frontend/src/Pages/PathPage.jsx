import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { fetchPathGraph } from '../store/dataStore';
import Tree from 'react-d3-tree';

const PathPage = () => {
  const [treeData, setTreeData] = useState(null);
  const [userText, setUserText] = useState("");
  const [dimensions, setDimensions] = useState({ x: 0, y: 0 });

  const buildTree = (nodes, edges) => {
    const nodeMap = {};
    const childrenMap = {};
    const parentCount = {};

    nodes.forEach(n => {
      nodeMap[n.id] = { name: n.label, id: n.id, children: [] };
      parentCount[n.id] = 0;
    });

    edges.forEach(({ from, to }) => {
      parentCount[to]++;
      if (!childrenMap[from]) childrenMap[from] = [];
      childrenMap[from].push(to);
    });

    Object.entries(childrenMap).forEach(([from, children]) => {
      nodeMap[from].children = children.map(cid => nodeMap[cid]);
    });

    const roots = nodes.filter(n => parentCount[n.id] === 0).map(n => nodeMap[n.id]);
    return roots.length === 1 ? roots[0] : { name: "Root", children: roots };
  };

  const handleSearch = async () => {
    const data = await fetchPathGraph(userText.trim());
    console.log("Tree data:", data);
    if (data) {
      const tree = buildTree(data.nodes, data.edges);
      setTreeData(tree);
    }
  };

  useEffect(() => {
    const container = document.getElementById("treeWrapper");
    if (container) {
      setDimensions({
        x: container.offsetWidth / 2,
        y: 80,
      });
    }
  }, [treeData]);

  return (
    <div className="min-h-screen bg-black text-white font-outfit">
      <Navbar />

      <section className="flex flex-col justify-center items-center text-center h-screen px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-4"
        >
          What do you want to be <span className="text-[#A259FF]">Today.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-[#AAAAAA] max-w-xl mb-8"
        >
          Find an easiest path to your journey!
        </motion.p>
        <input
          type="text"
          onChange={(e) => setUserText(e.target.value)}
          value={userText}
          className="bg-[#222222] px-6 py-3 rounded-2xl font-semibold text-white placeholder:text-[#AAAAAA] border border-[#444]"
          placeholder="Enter your Target"
        />
        <button
          onClick={handleSearch}
          className="bg-[#A259FF] px-6 py-3 m-3 rounded-full font-semibold text-black hover:bg-purple-500 transition"
        >
          Search
        </button>
      </section>

      {treeData && (
        <section className="bg-black px-4 py-10 min-h-[600px] overflow-auto">
          <div className="w-full h-[80vh]" id="treeWrapper">
            <Tree
              data={treeData}
              orientation="vertical"
              collapsible
              translate={dimensions}
              pathFunc="elbow"
              renderCustomNodeElement={({ nodeDatum }) => (
                <g>
                  <circle r={12} fill="#A259FF" />
                  <text
                    fill="white"
                    stroke="none"
                    x={20}
                    y={5}
                    fontSize="12"
                    fontFamily="Outfit"
                  >
                    {nodeDatum.name}
                  </text>
                </g>
              )}
              styles={{
                links: {
                  stroke: '#AAAAAA',
                  strokeWidth: 1.5,
                },
                nodes: {
                  node: {
                    circle: { fill: '#A259FF' },
                    name: { fill: '#FFFFFF', fontSize: 14, fontFamily: 'Outfit' },
                  },
                  leafNode: {
                    circle: { fill: '#7B5EFF' },
                    name: { fill: '#FFFFFF', fontSize: 14, fontFamily: 'Outfit' },
                  },
                },
              }}
            />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default PathPage;
