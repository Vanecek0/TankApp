import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="currentColor"
      className="bi bi-clock-fill"
      {...props}
    >
      <Path d="M16 8A8 8 0 110 8a8 8 0 0116 0M8 3.5a.5.5 0 00-1 0V9a.5.5 0 00.252.434l3.5 2a.5.5 0 00.496-.868L8 8.71z" />
    </Svg>
  )
}

export default SvgComponent
