import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      fill="transparent"
      viewBox="0 0 24 24"
      stroke={props.color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-check"
      {...props}
    >
      <Path d="M20 6L9 17 4 12" />
    </Svg>
  )
}

export default SvgComponent
