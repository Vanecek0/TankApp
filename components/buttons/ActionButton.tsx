import { Animated, View } from 'react-native';
import CustomButton from '../common/Buttons';
import ActionModal from '../modals/actionModal';
import { spacing } from '@/utils/SizeScaling';
import { Colors } from '@/constants/Colors';
import { useEffect, useRef, useState } from 'react';
import { useModal } from '@/hooks/useModal';

type ActionButtonProps = {
    children?: React.ReactNode
    scrollY?: Animated.Value
}

export function ActionButton({ children, scrollY }: ActionButtonProps) {
    const { showPlainModal } = useModal()

    const fadeAnim = useRef(new Animated.Value(1)).current
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (!(scrollY instanceof Animated.Value)) return

        let lastValue = 0

        const id = scrollY.addListener(({ value }) => {
            if (value > lastValue + 3) {
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 5,
                    useNativeDriver: true,
                }).start(() => setDisabled(true))
            } else if (value < lastValue - 3) {
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 5,
                    useNativeDriver: true,
                }).start(() => setDisabled(false))
            }
            lastValue = value
        })

        return () => scrollY.removeListener(id)
    }, [scrollY, fadeAnim])

    return (
        <View >
            <Animated.View
                style={{
                    opacity: fadeAnim,
                }}
                pointerEvents={disabled ? "none" : "auto"}
                className="flex justify-end items-end absolute inset-0"
            >
                <CustomButton
                    onPress={() => showPlainModal(ActionModal, { children })}
                    style={{
                        ...spacing.borderRadius(90),
                        ...spacing.p(24),
                        ...spacing.mb(12),
                        ...spacing.right(20),
                        ...spacing.width(80),
                    }}
                    className="flex justify-center items-center aspect-square"
                    label="+"
                    labelSize="xl"
                    labelStyle={{ color: Colors.white }}
                    backgroundColor={Colors.primary}
                />
            </Animated.View>
        </View>
    )
}