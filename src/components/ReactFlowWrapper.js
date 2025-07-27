// import React, { useCallback, useState, useRef, useEffect } from "react";
// import {
//   ReactFlow,
//   MiniMap,
//   Controls,
//   Background,
//   useNodesState,
//   useEdgesState,
//   addEdge,
//   useReactFlow,
//   MarkerType,
//   reconnectEdge,
// } from "@xyflow/react";
// import { HexColorPicker } from "react-colorful";
// import "@xyflow/react/dist/style.css";

// import { ShapePalette } from "./ShapePalette";
// import { CircleNode } from "./CircleNode";

// import { TriangleNode } from "./TriangleNode";
// import { SquareNode } from "./SquareNode";
// import DownloadButton from "./DownloadButton";
// import { AnimatedSVGEdge } from "./AnimatedSvgEdge";
// import { DropDown } from "./NodeDropDown";
// import { OffsetEdge } from "./OffsetEdge";
// import { CustomInteractivityToggle } from "./CustomInteractivityToggle";

// const nodeTypes = {
//   circle: CircleNode,
//   triangle: TriangleNode,
//   square: SquareNode,
// };

// const edgeTypes = {
//   animatedSvg: AnimatedSVGEdge,
//   offset: OffsetEdge,
// };

// const initialNodes = [];
// const initialEdges = [];
// // let nodeId = 1;
// // const snapGrid = [25, 25];
// const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

// export const ReactFlowWrapper = () => {
//   const reactFlowWrapper = useRef(null);
//   const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
//   const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
//   const [rfInstance, setRfInstance] = useState(null);
//   const { screenToFlowPosition, setViewport, toObject } = useReactFlow();

//   const [selectedNodeId, setSelectedNodeId] = useState(null);
//   const [color, setColor] = useState("#00b894");
//   const [pickerPos, setPickerPos] = useState({ x: 0, y: 0 });

//   // const [jsonData, setJsonData] = useState(null);

//   const [contextMenu, setContextMenu] = useState({
//     visible: false,
//     x: 0,
//     y: 0,
//     node: null,
//   });

//   const onNodeContextMenu = (event, node) => {
//     event.preventDefault();
//     setContextMenu({
//       visible: true,
//       x: event.clientX,
//       y: event.clientY,
//       node,
//     });
//   };

//   const closeContextMenu = () => {
//     setContextMenu({ visible: false, x: 0, y: 0, node: null });
//   };

//   useEffect(() => {
//     const handleClickOutside = () => closeContextMenu();
//     window.addEventListener("click", handleClickOutside);
//     return () => window.removeEventListener("click", handleClickOutside);
//   }, []);

//   const [edgeMenu, setEdgeMenu] = useState({
//     visible: false,
//     x: 0,
//     y: 0,
//     edgeId: null,
//   });

//   const onEdgeContextMenu = useCallback((event, edge) => {
//     event.preventDefault();
//     setEdgeMenu({
//       visible: true,
//       x: event.clientX,
//       y: event.clientY,
//       edgeId: edge.id,
//     });
//   }, []);

//   const updateEdgeStatus = (status) => {
//     const statusStyles = {
//       // working: {
//       //   stroke: "#27ae60",
//       //   strokeWidth: 2,
//       //   animated: true,
//       //   label: "Connected",
//       // },
//       "not-working": {
//         stroke: "#e74c3c",
//         strokeWidth: 1,
//         animated: false,
//         label: "Not Working",
//       },
//       "high-latency": {
//         stroke: "#f39c12",
//         strokeWidth: 2,
//         animated: false,
//         label: "High Latency",
//       },
//       disconnected: {
//         stroke: "#e74c3c",
//         strokeWidth: 1,
//         strokeDasharray: "5,5",
//         animated: false,
//         label: "Disconnected",
//       },
//     };

//     setEdges((eds) =>
//       eds.map((e) =>
//         e.id === edgeMenu.edgeId
//           ? {
//               ...e,
//               style: {
//                 ...e.style,
//                 stroke: statusStyles[status].stroke,
//                 strokeWidth: statusStyles[status].strokeWidth,
//                 strokeDasharray: statusStyles[status].strokeDasharray || "0",
//               },
//               animated: statusStyles[status].animated,
//               label: statusStyles[status].label,
//               data: { ...e.data, status },
//             }
//           : e
//       )
//     );

//     setEdgeMenu({ ...edgeMenu, visible: false });
//   };

//   const onConnect = useCallback(
//     (params) =>
//       setEdges((eds) =>
//         addEdge(
//           {
//             ...params,
//             type: "offset",
//             markerEnd: { type: MarkerType.Arrow },
//             type: "smoothstep",
//             animated: "true",
//             // label: params.source,
//           },
//           eds
//         )
//       ),
//     [setEdges]
//   );

//   const onDragOver = useCallback((event) => {
//     event.preventDefault();
//     event.dataTransfer.dropEffect = "move";
//   }, []);

//   const onDrop = useCallback(
//     (event) => {
//       event.preventDefault();
//       const bounds = reactFlowWrapper.current.getBoundingClientRect();
//       const shapeData = event.dataTransfer.getData("application/reactflow");
//       if (!shapeData) return;

//       const shape = JSON.parse(shapeData);
//       const position = screenToFlowPosition({
//         x: event.clientX - bounds.left,
//         y: event.clientY - bounds.top,
//       });

//       const newNode = {
//         // id: `node_${nodeId++}`,
//         id: "id-" + Math.random().toString(36).substr(2, 9),
//         type: shape.type,
//         position,
//         data: { label: shape.label, color: shape.color }, // we store color here
//       };

//       setNodes((nds) => [...nds, newNode]);
//     },
//     [screenToFlowPosition, setNodes]
//   );

//   const onNodeClick = (event, node) => {
//     const bounds = event.target.getBoundingClientRect();
//     setPickerPos({ x: bounds.x, y: bounds.y });
//     setSelectedNodeId(node.id);
//     setColor(node.style?.background || "#00b894");
//   };

//   const handleColorChange = (newColor) => {
//     setColor(newColor);
//     setNodes((nds) =>
//       nds.map((n) =>
//         n.id === selectedNodeId
//           ? { ...n, data: { ...n.data, color: newColor } } // update color in data
//           : n
//       )
//     );
//   };

//   const handleDownload = () => {
//     const data = toObject();
//     const blob = new Blob([JSON.stringify(data, null, 2)], {
//       type: "application/json",
//     });

//     const url = URL.createObjectURL(blob);
//     // console.log(JSON.stringify(data, null, 2))
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "flow.json";
//     a.click();
//     URL.revokeObjectURL(url);
//   };

//   const onSave = () => {
//     if (rfInstance) {
//       const flow = rfInstance.toObject();
//       console.log(rfInstance.toObject());
//       localStorage.setItem("flow-diagram", JSON.stringify(flow));
//       console.log(JSON.stringify(flow));
//     }
//   };

//   const onRestore = () => {
//     const saved = localStorage.getItem("flow-diagram");
//     if (saved) {
//       const flow = JSON.parse(saved);
//       setNodes(flow.nodes || []);
//       setEdges(flow.edges || []);
//       setViewport(flow.viewport || { x: 0, y: 0, zoom: 1 });
//     }
//   };

//   const handleFileChange = (event) => {
//     // if(initialNodes){
//     //     alert("If you have node / drawings already on the canvas , that may be replaced with the drawing from you selected file")
//     // }

//     const file = event.target.files[0];

//     if (file) {
//       const reader = new FileReader();

//       reader.onload = (e) => {
//         const jsonString = e.target.result;
//         try {
//           const parsedData = JSON.parse(jsonString);

//           setNodes(parsedData.nodes);
//           setEdges(parsedData.edges);
//           // setJsonData(parsedData); // Store the parsed JSON data in state
//           // console.log(parsedData)
//         } catch (error) {
//           console.error("Error parsing JSON:", error);
//           alert("Invalid JSON file.");
//           //   setJsonData(null);
//         }
//       };

//       reader.readAsText(file);
//     }
//   };

//   const onReconnect = useCallback(
//     (oldEdge, newConnection) => {
//       setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
//     },
//     [setEdges]
//   );

//   const clearCanvas = () => {
//     setEdges([]);
//     setNodes([]);
//   };

//   const handleNodeSelect = (selectedNode) => {
//     const position = { x: 250, y: 100 + nodes.length * 80 };

//     const newNode = {
//       id: `node-${Date.now()}`,
//       type: selectedNode.type,
//       position,
//       data: {
//         label: selectedNode.label,
//         color: selectedNode.color,
//       },
//     };

//     setNodes((nds) => [...nds, newNode]);
//   };

//   useEffect(() => {
//     const socket = new WebSocket("ws://192.168.1.4:8080"); // Replace with your server address

//     socket.onopen = () => {
//       console.log("WebSocket connected");
//       socket.send("Hello Server!");
//     };

//     socket.onmessage = (event) => {
//       try {
//         const message = JSON.parse(event.data);

//         // Expected message format: { id: "node-1", status: "major" }
//         const { id, status } = message;

//         // Update the node's status to trigger color change
//         setNodes((nds) =>
//           nds.map((node) =>
//             node.id === id ? { ...node, data: { ...node.data, status } } : node
//           )
//         );
//       } catch (e) {
//         console.error("Invalid WebSocket message:", event.data);
//       }
//     };

//     socket.onerror = (error) => console.error("WebSocket error:", error);
//     socket.onclose = () => console.log("WebSocket closed");

//     return () => socket.close(); // Clean up on unmount
//   }, [setNodes]);

//   const [readonly, setReadonly] = useState(false);

//   const toggleReadonly = () => {
//     setReadonly((prev) => !prev);
//   };

//   return (
//     <div style={{ width: "100vw", height: "100vh" }} ref={reactFlowWrapper}>
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         // onNodesChange={onNodesChange}
//         // onEdgesChange={onEdgesChange}
//         // onConnect={onConnect}
//         onInit={setRfInstance}
//         onDrop={onDrop}
//         onDragOver={onDragOver}
//         onNodeClick={readonly ? undefined : onNodeClick}
//         onEdgeContextMenu={onEdgeContextMenu}
//         onNodeContextMenu={onNodeContextMenu}
//         nodeTypes={nodeTypes}
//         // snapToGrid={true}
//         // snapGrid={snapGrid}
//         defaultViewport={defaultViewport}
//         deleteKeyCode={["Delete", "Backspace"]}
//         onReconnect={readonly ? undefined : onReconnect} // Enable edge reconnection
//         reconnectable={"true"} // Allow individual edges to be reconnected
//         edgeTypes={edgeTypes}
//         fitView
//         className="download-image"
//         onNodesChange={readonly ? undefined : onNodesChange}
//         onEdgesChange={readonly ? undefined : onEdgesChange}
//         onConnect={readonly ? undefined : onConnect}
//         nodesDraggable={!readonly}
//         nodesConnectable={!readonly}
//         elementsSelectable={!readonly}
//         panOnDrag={true}
//         zoomOnScroll={true}
//         zoomOnPinch={true}
//       >
//         <MiniMap zoomable pannable />
//         <Controls />

//         <Background
//           variant="dots"
//           gap={12}
//           size={1}
//           style={{ backgroundColor: "#E3F2FD" }}
//         />

//         <button
//           onClick={toggleReadonly}
//           style={{
//             position: "absolute",
//             top: 10,
//             left: 10,
//             padding: "8px 12px",
//             background: readonly ? "#e67e22" : "#27ae60",
//             color: "white",
//             border: "none",
//             borderRadius: 4,
//             zIndex: 1000,
//             cursor: "pointer",
//           }}
//         >
//           {readonly ? "Enable Editing" : "Readonly Mode"}
//         </button>
//       </ReactFlow>

//       {/* <ShapePalette /> */}
//       <DropDown onNodeSelect={handleNodeSelect} />

//       {selectedNodeId && (
//         <div
//           style={{
//             position: "absolute",
//             left: pickerPos.x + 60,
//             top: pickerPos.y + 60,
//             background: "#fff",
//             border: "1px solid #ccc",
//             padding: 10,
//             borderRadius: 6,
//             zIndex: 9999,
//           }}
//         >
//           <HexColorPicker color={color} onChange={handleColorChange} />
//           <button
//             onClick={() => setSelectedNodeId(null)}
//             style={{ marginTop: 10 }}
//           >
//             Close
//           </button>
//         </div>
//       )}

//       {edgeMenu.visible && (
//         <div
//           style={{
//             position: "absolute",
//             top: edgeMenu.y,
//             left: edgeMenu.x,
//             background: "white",
//             border: "1px solid #ccc",
//             padding: 10,
//             borderRadius: 6,
//             zIndex: 1000,
//           }}
//         >
//           <strong>Set Link Status</strong>
//           <div style={{ marginTop: 6, display: "flex", gap: "10px" }}>
//             {/* <button onClick={() => updateEdgeStatus("working")}>
//               ✅ Working
//             </button> */}
//             <button onClick={() => updateEdgeStatus("not-working")}>
//               ❌ Not Working
//             </button>
//             <button onClick={() => updateEdgeStatus("high-latency")}>
//               ⚠️ High Latency
//             </button>
//             <button onClick={() => updateEdgeStatus("disconnected")}>
//               🚫 Disconnected
//             </button>
//           </div>
//         </div>
//       )}

//       {contextMenu.visible && (
//         <div
//           style={{
//             position: "absolute",
//             top: contextMenu.y,
//             left: contextMenu.x,
//             backgroundColor: "white",
//             border: "1px solid #ccc",
//             borderRadius: 6,
//             padding: "10px",
//             zIndex: 10000,
//             boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
//             fontSize: "12px",
//             minWidth: "150px",
//           }}
//         >
//           <strong>Node Info</strong>
//           <hr />
//           <p>
//             <b>ID:</b> {contextMenu.node.id}
//           </p>
//           <p>
//             <b>Label:</b> {contextMenu.node.data?.label}
//           </p>
//           <p>
//             <b>Type:</b> {contextMenu.node.type}
//           </p>
//           <p>
//             <b>Color:</b> {contextMenu.node.data?.color}
//           </p>
//         </div>
//       )}

//       <div
//         style={{
//           position: "absolute",
//           top: 20,
//           right: 20,
//           background: "white",
//           padding: 10,
//           borderRadius: 8,
//           boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
//           display: "flex",

//           gap: "10px",
//         }}
//       >
//         <button onClick={handleDownload}>Download Flow as JSON</button>
//         <button onClick={onSave}>Save</button>
//         <button onClick={onRestore}>Restore</button>
//         <DownloadButton />
//         <button onClick={clearCanvas}>Clear canvas</button>
//         <div>
//           <input
//             id="file-upload"
//             type="file"
//             accept=".json"
//             onChange={handleFileChange}
//           />
//         </div>
//       </div>

//       <div
//         id="demo-content"
//         style={{
//           maxHeight: "100vh",
//           minWidth: "300px",
//           height: "min-content",
//           backgroundColor: "white",
//           borderRadius: "10px",
//           width: "min-content",
//           position: "absolute",
//           top: "70px",
//           right: "20px",
//           padding: "20px",
//           boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//         }}
//       >
//         {" "}
//         demo content
//       </div>
//     </div>
//   );
// };

//// new code

import React, { useCallback, useState, useRef, useEffect } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  addEdge,
  useReactFlow,
  MarkerType,
  reconnectEdge,
} from "@xyflow/react";
import { HexColorPicker } from "react-colorful";
import "@xyflow/react/dist/style.css";

// CHAKRA UI IMPORTS (add these if not already present)
import { Box, Button, Input } from "@chakra-ui/react"; // Add any other Chakra components you use

import { CircleNode } from "./CircleNode";
import { TriangleNode } from "./TriangleNode";
import { SquareNode } from "./SquareNode";
import DownloadButton from "./DownloadButton";
import { AnimatedSVGEdge } from "./AnimatedSvgEdge";
import { OffsetEdge } from "./OffsetEdge";
import { DropDown } from "./NodeDropDown"; // Your updated DropDown component

// REDUX IMPORTS
import { useSelector, useDispatch } from "react-redux";
import {
  setFlow,
  updateNodes,
  updateEdges,
  addNode,
  addEdge as addEdgeAction,
  updateNodeColor,
  setSelectedNodeId,
  updateEdgeStatus,
  clearFlow,
  undo,
  redo,
  pushStateToHistory,
} from "../redux/slices/topologySlice";

const nodeTypes = {
  circle: CircleNode,
  triangle: TriangleNode,
  square: SquareNode,
};

const edgeTypes = {
  animatedSvg: AnimatedSVGEdge,
  offset: OffsetEdge,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

export const ReactFlowWrapper = () => {
  const reactFlowWrapper = useRef(null);

  const nodes = useSelector((state) => state.flow.nodes);
  const edges = useSelector((state) => state.flow.edges);
  const selectedNodeId = useSelector((state) => state.flow.selectedNodeId);
  const canUndo = useSelector((state) => state.flow.past.length > 0);
  const canRedo = useSelector((state) => state.flow.future.length > 0);
  const dispatch = useDispatch();

  const [rfInstance, setRfInstance] = useState(null);
  const { screenToFlowPosition, setViewport, toObject } = useReactFlow();

  const [color, setColor] = useState("#00b894");
  const [pickerPos, setPickerPos] = useState({ x: 0, y: 0 });

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    node: null,
  });

  const onNodeContextMenu = (event, node) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      node,
    });
  };

  const closeContextMenu = () => {
    setContextMenu({ visible: false, x: 0, y: 0, node: null });
  };

  useEffect(() => {
    const handleClickOutside = () => closeContextMenu();
    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  const [edgeMenu, setEdgeMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    edgeId: null,
  });

  const onEdgeContextMenu = useCallback((event, edge) => {
    event.preventDefault();
    setEdgeMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
      edgeId: edge.id,
    });
  }, []);

  const handleUpdateEdgeStatus = (status) => {
    dispatch(pushStateToHistory());
    dispatch(updateEdgeStatus({ edgeId: edgeMenu.edgeId, status }));
    setEdgeMenu({ ...edgeMenu, visible: false });
  };

  const onNodesChange = useCallback(
    (changes) => {
      const shouldPushHistory = changes.some(
        (change) => change.type === "remove" || change.type === "add"
      );

      if (shouldPushHistory) {
        dispatch(pushStateToHistory());
      }
      dispatch(updateNodes(changes));
    },
    [dispatch]
  );

  const onEdgesChange = useCallback(
    (changes) => {
      const shouldPushHistory = changes.some(
        (change) => change.type === "remove"
      );

      if (shouldPushHistory) {
        dispatch(pushStateToHistory());
      }
      dispatch(updateEdges(changes));
    },
    [dispatch]
  );

  const onConnect = useCallback(
    (params) => {
      dispatch(pushStateToHistory());
      const newEdge = {
        ...params,
        type: "offset",
        markerEnd: { type: MarkerType.Arrow },
        animated: true,
      };
      dispatch(addEdgeAction(newEdge));
    },
    [dispatch]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      dispatch(pushStateToHistory());
      event.preventDefault();
      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const shapeData = event.dataTransfer.getData("application/reactflow");
      if (!shapeData) return;

      const shape = JSON.parse(shapeData);
      const position = screenToFlowPosition({
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      });

      const newNode = {
        id: "id-" + Math.random().toString(36).substr(2, 9),
        type: shape.type,
        position,
        data: { label: shape.label, color: shape.color },
      };

      dispatch(addNode(newNode));
    },
    [screenToFlowPosition, dispatch]
  );

  const onNodeDragStart = useCallback(
    (event, node) => {
      dispatch(pushStateToHistory());
    },
    [dispatch]
  );

  const onNodeDragStop = useCallback((event, node) => {
    // History was pushed on onNodeDragStart
  }, []);

  const onNodeClick = (event, node) => {
    const bounds = event.target.getBoundingClientRect();
    setPickerPos({ x: bounds.x, y: bounds.y });
    dispatch(setSelectedNodeId(node.id));
    setColor(node.data?.color || "#00b894");
  };

  const handleColorChange = (newColor) => {
    setColor(newColor);
    if (selectedNodeId) {
      dispatch(pushStateToHistory());
      dispatch(updateNodeColor({ nodeId: selectedNodeId, color: newColor }));
    }
  };

  const handleDownload = () => {
    const data = toObject();
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "flow.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const onSave = () => {
    if (rfInstance) {
      const flow = rfInstance.toObject();
      localStorage.setItem("flow-diagram", JSON.stringify(flow));
      console.log(JSON.stringify(flow));
    }
  };

  const onRestore = () => {
    const saved = localStorage.getItem("flow-diagram");
    if (saved) {
      const flow = JSON.parse(saved);
      dispatch(setFlow({ nodes: flow.nodes || [], edges: flow.edges || [] }));
      setViewport(flow.viewport || { x: 0, y: 0, zoom: 1 });
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonString = e.target.result;
        try {
          const parsedData = JSON.parse(jsonString);
          dispatch(
            setFlow({ nodes: parsedData.nodes, edges: parsedData.edges })
          );
        } catch (error) {
          console.error("Error parsing JSON:", error);
          alert("Invalid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  const onReconnect = useCallback(
    (oldEdge, newConnection) => {
      dispatch(pushStateToHistory());
      const changes = [
        { id: oldEdge.id, type: "remove" },
        { item: { ...oldEdge, ...newConnection, id: oldEdge.id }, type: "add" },
      ];
      dispatch(updateEdges(changes));
    },
    [dispatch]
  );

  const handleClearCanvas = () => {
    dispatch(clearFlow());
  };

  // --- MODIFIED: handleNodeSelect now accepts an array ---
  const handleNodeSelect = useCallback(
    (selectedNodeTypes) => {
      // If nothing selected, or no array, just return
      if (!selectedNodeTypes || selectedNodeTypes.length === 0) return;

      // Push to history only once for this batch operation
      dispatch(pushStateToHistory());

      selectedNodeTypes.forEach((selectedNode, index) => {
        // Calculate a staggered position for multiple nodes
        const position = {
          x: 250 + index * 50, // Stagger X
          y: 100 + (nodes.length + index) * 80, // Stagger Y based on existing nodes + new ones
        };

        const newNode = {
          id: `node-${Date.now()}-${index}`, // Ensure unique IDs for multiple additions at once
          type: selectedNode.value, // Use .value from the selected option
          position,
          data: {
            label: selectedNode.label, // Use .label from the selected option
            color: selectedNode.color, // Use .color from the selected option
          },
        };
        dispatch(addNode(newNode)); // Dispatch addNode for each selected type
      });
    },
    [dispatch, nodes.length]
  ); // Depend on nodes.length for staggering

  useEffect(() => {
    const socket = new WebSocket("ws://192.168.1.4:8080");

    socket.onopen = () => {
      console.log("WebSocket connected");
      socket.send("Hello Server!");
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        const { id, status } = message;
        dispatch(updateNodes([{ id, type: "change", data: { status } }]));
      } catch (e) {
        console.error("Invalid WebSocket message:", event.data);
      }
    };

    socket.onerror = (error) => console.error("WebSocket error:", error);
    socket.onclose = () => console.log("WebSocket closed");

    return () => socket.close();
  }, [dispatch]);

  const [readonly, setReadonly] = useState(false);

  const toggleReadonly = () => {
    setReadonly((prev) => !prev);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onInit={setRfInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onNodeClick={readonly ? undefined : onNodeClick}
        onEdgeContextMenu={onEdgeContextMenu}
        onNodeContextMenu={onNodeContextMenu}
        nodeTypes={nodeTypes}
        defaultViewport={defaultViewport}
        deleteKeyCode={["Delete", "Backspace"]}
        onReconnect={readonly ? undefined : onReconnect}
        reconnectable={"true"}
        edgeTypes={edgeTypes}
        fitView
        className="download-image"
        onNodesChange={readonly ? undefined : onNodesChange}
        onEdgesChange={readonly ? undefined : onEdgesChange}
        onConnect={readonly ? undefined : onConnect}
        nodesDraggable={!readonly}
        nodesConnectable={!readonly}
        elementsSelectable={!readonly}
        panOnDrag={true}
        zoomOnScroll={true}
        zoomOnPinch={true}
        onNodeDragStart={readonly ? undefined : onNodeDragStart}
        onNodeDragStop={readonly ? undefined : onNodeDragStop}
      >
        <MiniMap zoomable pannable />
        <Controls />

        <Background
          variant="dots"
          gap={12}
          size={1}
          style={{ backgroundColor: "#E3F2FD" }}
        />

        <Button // Chakra Button instead of native HTML button
          onClick={toggleReadonly}
          position="absolute"
          top={4}
          left={4}
          colorScheme={readonly ? "orange" : "green"} // Chakra color schemes
          zIndex={1000}
        >
          {readonly ? "Enable Editing" : "Readonly Mode"}
        </Button>
      </ReactFlow>

      {/* Dropdown component is now inside the FlowWrapper, but positioned fixed for demo */}
      <DropDown onNodeSelect={handleNodeSelect} />

      {selectedNodeId && (
        <Box
          style={{
            position: "absolute",
            left: pickerPos.x + 60,
            top: pickerPos.y + 60,
            background: "#fff",
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 6,
            zIndex: 9999,
          }}
        >
          <HexColorPicker color={color} onChange={handleColorChange} />
          <Button // Chakra Button
            onClick={() => dispatch(setSelectedNodeId(null))}
            mt={4} // Chakra margin-top
          >
            Close
          </Button>
        </Box>
      )}

      {edgeMenu.visible && (
        <Box
          style={{
            position: "absolute",
            top: edgeMenu.y,
            left: edgeMenu.x,
            background: "white",
            border: "1px solid #ccc",
            padding: 10,
            borderRadius: 6,
            zIndex: 1000,
          }}
        >
          <strong>Set Link Status</strong>
          <Box mt={2} display="flex" gap="10px">
            {" "}
            {/* Chakra Box for spacing */}
            <Button onClick={() => handleUpdateEdgeStatus("not-working")}>
              ❌ Not Working
            </Button>
            <Button onClick={() => handleUpdateEdgeStatus("high-latency")}>
              ⚠️ High Latency
            </Button>
            <Button onClick={() => handleUpdateEdgeStatus("disconnected")}>
              🚫 Disconnected
            </Button>
          </Box>
        </Box>
      )}

      {contextMenu.visible && (
        <Box
          style={{
            position: "absolute",
            top: contextMenu.y,
            left: contextMenu.x,
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: 6,
            padding: "10px",
            zIndex: 10000,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            fontSize: "12px",
            minWidth: "150px",
          }}
        >
          <strong>Node Info</strong>
          <hr />
          <p>
            <b>ID:</b> {contextMenu.node.id}
          </p>
          <p>
            <b>Label:</b> {contextMenu.node.data?.label}
          </p>
          <p>
            <b>Type:</b> {contextMenu.node.type}
          </p>
          <p>
            <b>Color:</b> {contextMenu.node.data?.color}
          </p>
          {contextMenu.node.data?.status && (
            <p>
              <b>Status:</b> {contextMenu.node.data.status}
            </p>
          )}
        </Box>
      )}

      <Box // Use Chakra Box for this container
        position="absolute"
        top={5}
        right={5}
        bg="white"
        p={3}
        borderRadius="lg"
        boxShadow="md"
        display="flex"
        gap={2}
      >
        <Button onClick={handleDownload}>Download Flow as JSON</Button>
        <Button onClick={onSave}>Save</Button>
        <Button onClick={onRestore}>Restore</Button>
        <DownloadButton />
        <Button onClick={handleClearCanvas}>Clear canvas</Button>
        <Box>
          {" "}
          {/* Use Box for file input container */}
          <Input
            id="file-upload"
            type="file"
            accept=".json"
            onChange={handleFileChange}
            p={1} // Padding for input
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
          />
        </Box>
        <Button onClick={() => dispatch(undo())} disabled={!canUndo}>
          ↩️ Undo
        </Button>
        <Button onClick={() => dispatch(redo())} disabled={!canRedo}>
          ↪️ Redo
        </Button>
      </Box>
    </div>
  );
};
