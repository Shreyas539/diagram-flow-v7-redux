import React from 'react';
import { BaseEdge, getSmoothStepPath,  EdgeProps } from '@xyflow/react';
 
export function AnimatedSVGEdge({props}) {

    const{
        id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  markerEnd,
  markerStart    
} = props;

  const [edgePath] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
 
  return (
    <>
      <BaseEdge id={id} path={edgePath}  markerEnd={markerEnd} markerStart={markerStart} {...props} />
      <circle r="10" fill="#ff0073" linear infinte>
        <animateMotion dur="5s" repeatCount="indefinite" path={edgePath} linear infinte/>
      </circle>
    </>
  );
}

// export const AnimatedSVGEdge =()=>{
//     return(
//         <h1>Animated</h1>
//     )
// }