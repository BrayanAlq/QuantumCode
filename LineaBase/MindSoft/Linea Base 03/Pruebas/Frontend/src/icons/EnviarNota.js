import React from 'react';
import { Svg, Rect, Path } from 'react-native-svg';

export function EnviarNota(props) {
  return (
    <Svg
      width={props.width || 75}
      height={props.height || 75}
      viewBox="0 0 75 75"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect
        width="75"
        height="75"
        rx="37.5"
        fill={props.bgColor || "#0B72D2"}
      />
      <Path
        d="M23 51.3334V24.6667L54.6667 38.0001L23 51.3334ZM26.3333 46.3334L46.0833 38.0001L26.3333 29.6667V35.5001L36.3333 38.0001L26.3333 40.5001V46.3334ZM26.3333 46.3334V38.0001V29.6667V35.5001V40.5001V46.3334Z"
        fill={props.iconColor || "#1D1B20"}
      />
    </Svg>
  );
}