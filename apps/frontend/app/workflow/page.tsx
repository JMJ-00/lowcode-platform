"use client";

import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { useCallback } from "react";

let id = 1;
const getId = () => `${id++}`;

export default function WorkflowPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  const addNode = (label: string) => {
    const newNode = {
      id: getId(),
      position: { x: Math.random() * 400, y: Math.random() * 400 },
      data: { label },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{ width: 200, padding: 10, background: "#f4f4f4" }}>
        <h3>Nodes</h3>

        <button onClick={() => addNode("API Request")}>
          API Node
        </button>

        <button onClick={() => addNode("Database")}>
          DB Node
        </button>

        <button onClick={() => addNode("If Condition")}>
          IF Node
        </button>

        <button onClick={() => addNode("Transform")}>
          Transform Node
        </button>
      </div>

      {/* Canvas */}
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}