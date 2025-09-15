import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 10 10"
      fill="transparent"
      stroke={props.color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9.583 2.5L5.625 6.458 3.542 4.375.417 7.5"
        strokeWidth={0.833333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.083 2.5h2.5V5"
        strokeWidth={0.833333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default SvgComponent
