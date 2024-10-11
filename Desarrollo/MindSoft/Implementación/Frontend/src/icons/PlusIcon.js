import { Path, Svg } from "react-native-svg";

export function PlusIcon({ style }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      className="icon icon-tabler icons-tabler-outline icon-tabler-plus"
      style={style}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="currentColor"
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M12 5l0 14" />
      <Path d="M5 12l14 0" />
    </Svg>
  )
}
