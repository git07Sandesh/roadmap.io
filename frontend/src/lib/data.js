const nodes = [
    { id: 'arrays', data: { label: 'Arrays & Hashing' }, position: { x: 250, y: 0 } },
    { id: 'two-pointers', data: { label: 'Two Pointers' }, position: { x: 100, y: 100 } },
    { id: 'stack', data: { label: 'Stack' }, position: { x: 400, y: 100 } },
  ];
  
const edges = [
    { id: 'e1', source: 'arrays', target: 'two-pointers' },
    { id: 'e2', source: 'arrays', target: 'stack' },
  ];

  export {nodes, edges}
  