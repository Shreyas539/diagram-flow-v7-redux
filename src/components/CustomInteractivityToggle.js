import React, { useState } from "react";
import { ReactFlow, useReactFlow, Controls, Background } from "@xyflow/react";

export const CustomInteractivityToggle = () => {
  const { setInteractive } = useReactFlow();
  const [interactive, setLocalInteractive] = useState(true);

  const toggle = () => {
    const next = !interactive;
    setInteractive(next);
    setLocalInteractive(next);
  };

  return (
    <button
      onClick={toggle}
      style={{
        position: "absolute",
        top: 100,
        left: 100,
        padding: "6px 12px",
        borderRadius: 4,
        background: interactive ? "#27ae60" : "#e74c3c",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      {interactive ? "Disable Interactivity" : "Enable Interactivity"}
    </button>
  );
};
