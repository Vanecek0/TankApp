import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-x"
      {...props}
    >
      <Path d="M18 6L6 18" />
      <Path d="M6 6L18 18" />
    </Svg>
  )
}

export default SvgComponent
