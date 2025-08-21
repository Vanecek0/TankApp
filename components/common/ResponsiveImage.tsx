import React, { useState, useCallback } from "react";
import {
    Image,
    ImageSourcePropType,
    ImageStyle,
    LayoutChangeEvent,
    StyleProp,
    StyleSheet,
    View,
} from "react-native";

type Props = {
    source: ImageSourcePropType | { uri: string };
    width?: number | null;
    height?: number | null;
    ratio?: number;
    style?: StyleProp<ImageStyle>;
    onLoad?: () => void;
    onLoadEnd?: () => void;
    onLoadStart?: () => void;
};

export default function ResponsiveImage({
    source,
    width: initialWidth = null,
    height: initialHeight = null,
    ratio,
    style,
    onLoad,
    onLoadEnd,
    onLoadStart,
}: Props) {
    const [width, setWidth] = useState<number | null>(initialWidth);
    const [height, setHeight] = useState<number | null>(initialHeight);

    const onLayout = useCallback(
        (event: LayoutChangeEvent) => {
            const containerWidth = event.nativeEvent.layout.width;

            if (ratio) {
                setWidth(containerWidth);
                setHeight(containerWidth * ratio);
            } else if (initialWidth && initialHeight) {
                setWidth(containerWidth);
                setHeight(containerWidth * (initialHeight / initialWidth));
            } else if (source) {
                let src: string | undefined;

                if (typeof source === "number") {
                    return;
                } else if ("uri" in source) {
                    src = source.uri;
                }

                if (src) {
                    Image.getSize(src, (w, h) => {
                        setWidth(containerWidth);
                        setHeight((containerWidth * h) / w);
                    });
                }
            }
        },
        [ratio, initialWidth, initialHeight, source]
    );

    return (
        <View onLayout={onLayout} style={styles.container}>
            <Image
                source={source}
                style={[style, { width: width ?? undefined, height: height ?? undefined }]}
                onLoad={onLoad}
                onLoadEnd={onLoadEnd}
                onLoadStart={onLoadStart}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
    },
});