import React from "react"
import { View } from "react-native"
import { Colors } from "@/constants/Colors"
import getScaleFactor, { spacing } from "@/utils/SizeScaling"
import { useTheme } from "@/theme/ThemeProvider"
import { useModal } from "@/providers/modalProvider"
import CustomButton from "@/components/common/Buttons"
import ScaledText from "@/components/common/ScaledText"
import Icon from "@/components/Icon";

type DeleteConfirmationModalProps = {
    message?: string
    deleteIcon?: React.ReactNode
    onConfirm: () => void | Promise<void>
    confirmLabel?: string
    cancelLabel?: string
}

export default function DeleteConfirmationModal({
    message = "Opravdu chcete smazat tento záznam?",
    deleteIcon,
    onConfirm,
    confirmLabel = "Smazat",
    cancelLabel = "Zrušit",
}: DeleteConfirmationModalProps) {
    const { hideSuperModal } = useModal()
    const { isDark } = useTheme()

    const handleConfirm = async () => {
        await onConfirm()
        hideSuperModal()
    }

    return (
        <View style={{ ...spacing.borderRadius(12) }}>
            <View
                className="border-b-[1px] sticky flex-row justify-between items-center"
                style={{
                    ...spacing.borderTopRadius(12),
                    borderColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
                    backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background,
                    ...spacing.p(24),
                }}
            >
                <View className="flex-row items-center relative w-3/4" style={{ ...spacing.gap(8) }}>
                    <View
                        style={{
                            ...spacing.borderRadius(8),
                            ...spacing.width(48),
                            ...spacing.height(48),
                            backgroundColor: Colors.primary,
                        }}
                        className="flex items-center justify-center"
                    >
                        <Icon name="bin" color={Colors.dark.text} size={getScaleFactor() * 20} />
                    </View>
                    <View>
                        <ScaledText size="xl" isThemed className="text-xl font-semibold">
                            Odstranit záznam
                        </ScaledText>
                        <ScaledText size="sm" isThemed>
                            Tuto akci nelze vrátit zpět
                        </ScaledText>
                    </View>
                </View>
                <View
                    onTouchEnd={() => hideSuperModal()}
                    style={{ ...spacing.p(36), ...spacing.me(-12) }}
                    className="justify-center items-center absolute right-0"
                >
                    <Icon name="cross" color={isDark ? Colors.dark.text : Colors.light.text} size={getScaleFactor() * 20} />
                </View>
            </View>
            <View style={{ ...spacing.p(24), }} className="flex justify-center items-center">
                <View style={{ ...spacing.m(12) }}>
                    {deleteIcon}
                </View>
                <ScaledText
                    size="lg"
                    color={isDark ? Colors.dark.text : Colors.light.text}
                >
                    {message}
                </ScaledText>

            </View>

            <View style={{ ...spacing.p(20), ...spacing.gap(8), ...spacing.borderBottomRadius(12), backgroundColor: isDark ? Colors.dark.secondary_light : Colors.light.background }} className='flex-row justify-between'>
                <CustomButton
                    className='flex-1'
                    onPress={hideSuperModal}
                    label={cancelLabel}
                    labelSize='base'
                    labelClassName='text-center'
                    labelColor={isDark ? Colors.white : ''}
                    style={{
                        ...spacing.p(12),
                        ...spacing.borderWidth(1),
                        borderColor: isDark ? Colors.dark.secondary_lighter : Colors.hidden_text, ...spacing.borderRadius(12)
                    }}
                    backgroundColor={isDark ? Colors.dark.secondary_light : Colors.light.secondary}
                />
                <CustomButton
                    className='flex-1'
                    onPress={handleConfirm}
                    label={confirmLabel}
                    labelSize='base'
                    labelClassName='text-center'
                    labelColor={Colors.white}
                    style={{
                        ...spacing.p(12),
                        ...spacing.borderRadius(12),
                        ...spacing.borderWidth(1),
                        borderColor: Colors.primary
                    }}
                    backgroundColor={Colors.primary}
                />
            </View>
        </View>
    )
}