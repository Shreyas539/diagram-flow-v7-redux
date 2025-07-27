import React from "react";
import { BaseEdge, getStraightPath } from "@xyflow/react";

const OFFSET_MAP = {
  top: -10,
  bottom: 10,
  left: -10,
  right: 10,
};

export const OffsetEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) => {
  const OFFSET = 8;

  const getOffset = (position, index) => {
    const base = OFFSET_MAP[position] || 0;
    return base + index * OFFSET;
  };

  // Extract offset directionally — optional enhancement
  const offsetX =
    sourcePosition === "left" || targetPosition === "left" ? -OFFSET : OFFSET;
  const offsetY =
    sourcePosition === "top" || targetPosition === "top" ? -OFFSET : OFFSET;

  const pathSourceX = sourceX + offsetX;
  const pathSourceY = sourceY + offsetY;
  const pathTargetX = targetX + offsetX;
  const pathTargetY = targetY + offsetY;

  const [edgePath] = getStraightPath({
    sourceX: pathSourceX,
    sourceY: pathSourceY,
    targetX: pathTargetX,
    targetY: pathTargetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} markerEnd={markerEnd} />
    </>
  );
};
