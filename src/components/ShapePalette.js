import pcIcon from '../assets/pc-icon.svg'
import routerIcon from '../assets/router-icon.svg'
import switchIcon from '../assets/network-switch-icon.svg'

export const ShapePalette = ({ onShapeDrag }) => {
  const shapes = [
    { type: "circle", label: "Circle", color: "#555" },
    { type: "triangle", label: "Triangle", color: "#555" },
    { type: "square", label: "Square", color: "#555" },
    // { type: "parallelogram", label: "Parallelogram", color: "#555" },
  ];

  const onDragStart = (event, shape) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify(shape));
    event.dataTransfer.effectAllowed = "move";
  };

  const renderShape = (shape) => {
    switch (shape.type) {
      case "circle":
        return (
          <div
            style={{
              borderRadius: "50%",
              width: "50px",
              height: "50px",
              backgroundColor: shape.color,
            }}
            draggable
            onDragStart={(e) => onDragStart(e, shape)}
          />
          // <img src={switchIcon} width={70} height={70} alt='network switch icon' /> </div>
        );
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: "25px solid transparent",
              borderRight: "25px solid transparent",
              borderBottom: `50px solid ${shape.color}`,
            }}
            draggable
            onDragStart={(e) => onDragStart(e, shape)}
          />
          // <img src={pcIcon} width={70} height={70} alt='pc icon' /></div>
        );
      case "square":
        return (
          <div
            style={{
              height: "50px",
              width: "50px",
              backgroundColor: shape.color,
            }}
            draggable
            onDragStart={(e) => onDragStart(e, shape)}
          />
          // <img src={routerIcon} width={70} height={70} alt='router icon' /></div>
        );

      default:
        return (
          <div>Default case</div>
        );

    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        left: "20px",
        zIndex: 1000,
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        width: '160px'
      }}
    >
      <h3>Shapes</h3>
      <p>Drag onto canvas</p>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}
      >
        {shapes.map((shape, i) => (
          <div key={i}>{renderShape(shape)}</div>
        ))}
      </div>
    </div>
  );
};