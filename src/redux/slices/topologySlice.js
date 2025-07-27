import { createSlice } from "@reduxjs/toolkit";
import { applyNodeChanges, applyEdgeChanges } from "@xyflow/react";

const initialState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  past: [], // Array to store previous states
  future: [], // Array to store future states (for redo)
};

export const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    // This action will be used to load initial nodes/edges (e.g., from local storage or file)
    setFlow: (state, action) => {
      // When setting a flow, we reset history as it's a new starting point
      state.past = [];
      state.future = [];
      state.nodes = action.payload.nodes || [];
      state.edges = action.payload.edges || [];
    },
    updateNodes: (state, action) => {
      // History push logic will happen *before* this action is dispatched from the component
      state.nodes = applyNodeChanges(action.payload, state.nodes);
    },
    updateEdges: (state, action) => {
      // History push logic will happen *before* this action is dispatched from the component
      state.edges = applyEdgeChanges(action.payload, state.edges);
    },
    addNode: (state, action) => {
      // History push logic will happen *before* this action is dispatched from the component
      state.nodes.push(action.payload);
    },
    addEdge: (state, action) => {
      // History push logic will happen *before* this action is dispatched from the component
      state.edges.push(action.payload);
    },
    updateNodeColor: (state, action) => {
      // History push logic will happen *before* this action is dispatched from the component
      const { nodeId, color } = action.payload;
      const node = state.nodes.find((n) => n.id === nodeId);
      if (node) {
        node.data = { ...node.data, color };
      }
    },
    setSelectedNodeId: (state, action) => {
      state.selectedNodeId = action.payload; // Usually not part of undo history
    },
    updateEdgeStatus: (state, action) => {
      // History push logic will happen *before* this action is dispatched from the component
      const { edgeId, status } = action.payload;
      const statusStyles = {
        "not-working": {
          stroke: "#e74c3c",
          strokeWidth: 1,
          animated: false,
          label: "Not Working",
        },
        "high-latency": {
          stroke: "#f39c12",
          strokeWidth: 2,
          animated: false,
          label: "High Latency",
        },
        disconnected: {
          stroke: "#e74c3c",
          strokeWidth: 1,
          strokeDasharray: "5,5",
          animated: false,
          label: "Disconnected",
        },
      };

      state.edges = state.edges.map((e) =>
        e.id === edgeId
          ? {
              ...e,
              style: {
                ...e.style,
                stroke: statusStyles[status].stroke,
                strokeWidth: statusStyles[status].strokeWidth,
                strokeDasharray: statusStyles[status].strokeDasharray || "0",
              },
              animated: statusStyles[status].animated,
              label: statusStyles[status].label,
              data: { ...e.data, status },
            }
          : e
      );
    },
    clearFlow: (state) => {
      state.nodes = [];
      state.edges = [];
      state.selectedNodeId = null;
      state.past = []; // Clear history on clear canvas
      state.future = [];
    },
    // --- Undo/Redo Reducers ---
    undo: (state) => {
      if (state.past.length > 0) {
        const previousState = state.past.pop(); // Get last past state
        state.future.push({ nodes: state.nodes, edges: state.edges }); // Push current to future
        state.nodes = previousState.nodes;
        state.edges = previousState.edges;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop(); // Get last future state
        state.past.push({ nodes: state.nodes, edges: state.edges }); // Push current to past
        state.nodes = nextState.nodes;
        state.edges = nextState.edges;
      }
    },
    // This action is specifically for pushing the current state to history
    // It is called directly from components before other modifying actions.
    pushStateToHistory: (state) => {
      const lastPastState = state.past[state.past.length - 1];
      if (
        lastPastState &&
        JSON.stringify(lastPastState.nodes) === JSON.stringify(state.nodes) &&
        JSON.stringify(lastPastState.edges) === JSON.stringify(state.edges)
      ) {
        return; // No actual change, don't push to history
      }
      state.past.push({
        nodes: state.nodes,
        edges: state.edges,
      });
      state.future = []; // Clear future history whenever a new action is performed
    },
  },
});

export const {
  setFlow,
  updateNodes,
  updateEdges,
  addNode,
  addEdge,
  updateNodeColor,
  setSelectedNodeId,
  updateEdgeStatus,
  clearFlow,
  undo,
  redo,
  pushStateToHistory, // Export this for manual dispatch
} = flowSlice.actions;

export default flowSlice.reducer;
