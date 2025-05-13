import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="currentColor"
      className="bi bi-calendar-fill"
      {...props}
    >
      <Path d="M3.5 0a.5.5 0 01.5.5V1h8V.5a.5.5 0 011 0V1h1a2 2 0 012 2v11a2 2 0 01-2 2H2a2 2 0 01-2-2V5h16V4H0V3a2 2 0 012-2h1V.5a.5.5 0 01.5-.5" />
    </Svg>
  )
}

export default SvgComponent
