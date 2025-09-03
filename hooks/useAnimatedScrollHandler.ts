import { useEffect, useRef } from "react";
import { Animated, NativeScrollEvent, NativeSyntheticEvent } from "react-native";

export function useAnimatedScrollHandler(scrollY: Animated.Value, watch?: any[], scrollToTopOnWatchChange?: boolean) {
    const lastScrollY = useRef(0);
    const buttonOpacity = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        Animated.timing(buttonOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();

        if (scrollToTopOnWatchChange) {
            console.log('Scrolling to top due to watch change', watch);
            Animated.timing(scrollY, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start();
        }
    }, watch);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const y = event.nativeEvent.contentOffset.y;

        if (y > lastScrollY.current + 2) {
            Animated.timing(buttonOpacity, {
                toValue: 0,
                duration: 20,
                useNativeDriver: true,
            }).start();
        } else if (y < lastScrollY.current - 2) {
            Animated.timing(buttonOpacity, {
                toValue: 1,
                duration: 20,
                useNativeDriver: true,
            }).start();
        }

        lastScrollY.current = y;
    };


    const animatedScrollHandler = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: false, listener: handleScroll }
    );

    return { handleScroll: animatedScrollHandler, buttonOpacity };
}