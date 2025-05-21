import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      viewBox="0 0 16 16"
      fill={props.color}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.216 15l-.111 1h2.012l.111-1h1.775a3.997 3.997 0 00.867-7.899L9.15 6.72 9.45 4H13V1H9.784l.111-1H7.883l-.111 1H5.997a3.997 3.997 0 00-.867 7.899l1.721.382L6.55 12H3v3h3.216zm2.346-3h1.441a.997.997 0 00.216-1.97l-1.404-.312L8.562 12zM7.185 6.282L7.438 4H5.997a.997.997 0 00-.216 1.97l1.404.312z"
      />
    </Svg>
  )
}

export default SvgComponent
