import {
  _pushToHistory,
  updateNodes,
  updateEdges,
  addNode,
  addEdge,
  updateNodeColor,
  updateEdgeStatus,
  clearFlow,
  undo, // Add undo to ignore list
  redo, // Add redo to ignore list
  setFlow, // Add setFlow to ignore list, as it resets history
} from "./slices/topologySlice";

const actionsToTrack = [
  updateNodes.type,
  updateEdges.type,
  addNode.type,
  addEdge.type,
  updateNodeColor.type,
  updateEdgeStatus.type,
  clearFlow.type,
];

// Actions that should *not* cause a new history entry
const actionsToIgnoreInHistory = [undo.type, redo.type, setFlow.type];

export const historyMiddleware = (storeAPI) => (next) => (action) => {
  // Before any relevant action, push the current state to history
  if (
    actionsToTrack.includes(action.type) &&
    !actionsToIgnoreInHistory.includes(action.type)
  ) {
    storeAPI.dispatch(_pushToHistory());
  }

  // Then, allow the original action to proceed
  const result = next(action);

  return result;
};
