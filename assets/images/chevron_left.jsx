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
      className="feather feather-chevron-left"
      {...props}
    >
      <Path d="M15 18L9 12 15 6" />
    </Svg>
  )
}

export default SvgComponent