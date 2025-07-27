// ReactFlowShapes.jsx
import React, { useCallback, useState, useRef } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  Handle,
  ReactFlowProvider,
  useReactFlow,
  MarkerType,
} from "@xyflow/react";
import { HexColorPicker } from "react-colorful";
import "@xyflow/react/dist/style.css";

import { CircleNode } from "./CircleNode";

import { TriangleNode } from "./TriangleNode";
import { SquareNode } from "./SquareNode";
import { ShapePalette } from "./ShapePalette";
import { ReactFlowWrapper } from "./ReactFlowWrapper";

export default function ReactFlowShapes() {
  return (
    <ReactFlowProvider>
      <ReactFlowWrapper />
    </ReactFlowProvider>
  );
}
