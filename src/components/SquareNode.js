import { Handle, Position } from "@xyflow/react";
import React from "react";

export const SquareNode = ({ id, data }) => {
  const topCount = 10;
  const bottomCount = 10;
  const leftCount = 6;
  const rightCount = 6;

  const width = 200;
  const height = 120;

  const handleStyle = {
    width: 10,
    height: 10,
    opacity: 1, // invisible
    pointerEvents: "auto",
    position: "absolute",
    zIndex: 2,
  };

  const portLabelStyle = {
    position: "absolute",
    fontSize: 8,
    color: "#000",
    userSelect: "none",
  };

  const statusColorMap = {
    normal: "#2ecc71",
    unmanaged: "#3498db",
    minor: "#f39c12",
    major: "#e74c3c",
  };

  const backgroundColor = statusColorMap[data?.status] || "#ccc";

  const generateHandleId = (side, index) => `${id}-${side}-${index + 1}`;

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        backgroundColor,
        borderRadius: 6,
      }}
    >
      {/* Top handles */}
      {Array.from({ length: topCount }).map((_, i) => {
        const left = ((i + 1) * 100) / (topCount + 1);
        return (
          <React.Fragment key={`top-${i}`}>
            <Handle
              id={generateHandleId("top", i)}
              type="source"
              position={Position.Top}
              isConnectable={true}
              style={{
                ...handleStyle,
                top: -5,
                left: `${left}%`,
                transform: "translateX(-50%)",
              }}
            />
            {data?.showLabels && (
              <div
                style={{
                  ...portLabelStyle,
                  top: -18,
                  left: `${left}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {i + 1}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Bottom handles */}
      {Array.from({ length: bottomCount }).map((_, i) => {
        const left = ((i + 1) * 100) / (bottomCount + 1);
        return (
          <React.Fragment key={`bottom-${i}`}>
            <Handle
              id={generateHandleId("bottom", i)}
              type="target"
              position={Position.Bottom}
              isConnectable={true}
              style={{
                ...handleStyle,
                bottom: -5,
                left: `${left}%`,
                transform: "translateX(-50%)",
              }}
            />
            {data?.showLabels && (
              <div
                style={{
                  ...portLabelStyle,
                  bottom: -18,
                  left: `${left}%`,
                  transform: "translateX(-50%)",
                }}
              >
                {topCount + i + 1}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Left handles */}
      {Array.from({ length: leftCount }).map((_, i) => {
        const top = ((i + 1) * 100) / (leftCount + 1);
        return (
          <React.Fragment key={`left-${i}`}>
            <Handle
              id={generateHandleId("left", i)}
              type="source"
              position={Position.Left}
              isConnectable={true}
              style={{
                ...handleStyle,
                top: `${top}%`,
                left: -5,
                transform: "translateY(-50%)",
              }}
            />
            {data?.showLabels && (
              <div
                style={{
                  ...portLabelStyle,
                  left: -20,
                  top: `${top}%`,
                  transform: "translateY(-50%)",
                }}
              >
                {topCount + bottomCount + i + 1}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Right handles */}
      {Array.from({ length: rightCount }).map((_, i) => {
        const top = ((i + 1) * 100) / (rightCount + 1);
        return (
          <React.Fragment key={`right-${i}`}>
            <Handle
              id={generateHandleId("right", i)}
              type="target"
              position={Position.Right}
              isConnectable={true}
              style={{
                ...handleStyle,
                top: `${top}%`,
                right: -5,
                transform: "translateY(-50%)",
              }}
            />
            {data?.showLabels && (
              <div
                style={{
                  ...portLabelStyle,
                  right: -25,
                  top: `${top}%`,
                  transform: "translateY(-50%)",
                }}
              >
                {topCount + bottomCount + leftCount + i + 1}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {/* Node label */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          fontSize: 12,
          color: "#111",
          textAlign: "center",
          pointerEvents: "none",
        }}
      >
        {data?.label || "Node"}
      </div>
    </div>
  );
};
