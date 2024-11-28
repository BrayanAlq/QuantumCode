import { Path, Svg } from "react-native-svg";

export function CheckIcon(props) {
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
      className="icon icon-tabler icons-tabler-outline icon-tabler-check"
      {...props}
    >
      <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <Path d="M5 12l5 5l10 -10" />
    </Svg>
  )
}
