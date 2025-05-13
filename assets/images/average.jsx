import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props) {
    return (
        <Svg
            viewBox="0 0 10 10"
            fill='transparent'
            stroke={props.color}
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <G clipPath="url(#clip0_96_76)">
                <Path
                    d="M9.545 5H7.727L6.364 9.09 3.636.91 2.273 5H.455"
                    strokeWidth={0.909091}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </G>
           
        </Svg>
    )
}

export default SvgComponent