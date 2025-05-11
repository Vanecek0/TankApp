import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="transparent"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-chevron-down"
      {...props}
    >
      <Path d="M6 9L12 15 18 9" />
    </Svg>
  )
}

export default SvgComponent