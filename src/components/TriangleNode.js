import {

  Position,
  Handle,

} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import pcIcon from '../assets/pc-icon.svg'

export const TriangleNode = ({ data }) => (
  <>
    <Handle
      type="source"
      position={Position.Right}
      style={{ background: "#555" }}
    />
    <div
      style={{
        width: 0,
        height: 0,
        borderLeft: "25px solid transparent",
        borderRight: "25px solid transparent",
        borderBottom: `50px solid ${data?.color || "#555"}`,
      }}
    />
    {/* <img src={pcIcon} width={100} height={100} alt="pc icon" /></div> */}
    <Handle
      type="target"
      position={Position.Left}
      style={{ background: "#555" }}
    />
  </>
);