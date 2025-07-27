import {

  Position,
  Handle,

} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import switchIcon from '../assets/network-switch-icon.svg'

export const CircleNode = ({ data }) => (
  <>
    <Handle
      type="source"
      position={Position.Right}
      style={{ background: "#555" }}
    />
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        backgroundColor: data?.color || "#555",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    />
    {/* <img src={switchIcon} width={100} height={100} alt="network switch icon" /></div> */}
    <Handle
      type="target"
      position={Position.Left}
      style={{ background: "#555" }}
    />
  </>
);