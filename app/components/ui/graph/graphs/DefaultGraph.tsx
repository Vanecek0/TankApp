import { useState } from "react";
import { View } from "react-native";

export default function DefaultGraph({ className }: {
    className?: string;
}) {

    const [parentWidth, setParentWidth] = useState(0);

    const onLayout = (event:any) => {
        const { width } = event.nativeEvent.layout;
        setParentWidth(width);
      };

    return (
        <View onLayout={onLayout} className={`${className}`}>
            
        </View>
    )
}