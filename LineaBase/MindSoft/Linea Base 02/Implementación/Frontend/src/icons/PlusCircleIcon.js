import { Circle, Path, Svg } from "react-native-svg";

export function PlusCircleIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke={props.color || "currentColor"} 
      {...props}
      width={props.size || 24} // Permite cambiar el tamaño desde props
      height={props.size || 24} // Permite cambiar el tamaño desde props
    >
      <Circle cx="12" cy="12" r="10" />
      <Path d="M12 8v8" />
      <Path d="M8 12h8" />
    </Svg>
  );
}
