import { Path, Svg } from "react-native-svg";

export function CalendarIcon({ style }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M11.5 21h-5.5a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v6" />
      <Path d="M16 3v4" />
      <Path d="M8 3v4" />
      <Path d="M4 11h16" />
      <Path d="M15 19l2 2l4 -4" />
    </Svg>
  )
}
