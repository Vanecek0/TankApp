import * as React from "react"
import Svg, { Path } from "react-native-svg"
const SvgComponent = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    width={24}
    height={24}
    fill={props.color}
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="feather feather-map-pin"
    {...props}
  >
    <Path
      stroke="none"
      d="M11.499 23.656c-4.828-4.67-8.292-10.523-8.482-14.332l-.03-.586.057-.562C3.68 1.845 10.332-1.857 16.01.96c2.794 1.387 4.608 4.03 4.95 7.216l.054.515-.028.61c-.177 3.814-3.67 9.716-8.506 14.379l-.328.316h-.3zm1.228-10.607c4.76-.83 4.315-7.886-.515-8.163l-.469-.026-.438.076A4.131 4.131 0 0 0 7.942 8.3l-.077.438.027.468a4.11 4.11 0 0 0 4.835 3.843z"
    />
  </Svg>
)
export default SvgComponent
