import React from 'react';
import { Svg, Rect, Path } from 'react-native-svg';

export function PlusIcon(props) {
  return (
    <Svg
      width={props.width || 680}
      height={props.height || 41}
      
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        y="0.79541"
        width="40"
        height="39.2565"
        rx="90"
        fill={props.bgColor || "#0B72D2"} // Puedes cambiar el color de fondo con bgColor
        
      />
      <Path
        d="M20.2667 13.3574V28.0132M12.8 20.6853H27.7333"
        stroke={props.strokeColor || "#1E1E1E"} // Puedes cambiar el color de la línea con strokeColor
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}