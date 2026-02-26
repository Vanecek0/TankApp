import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <Path d="M4 7L4 4 20 4 20 7" />
      <Path d="M9 20L15 20" />
      <Path d="M12 4L12 20" />
    </Svg>
  )
}

export default SvgComponent