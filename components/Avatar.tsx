import { useTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/utils/SizeScaling";
import ScaledText from "./common/ScaledText";
import { ResponsiveImageProps } from "./common/ResponsiveImage";


type AvatarProps = {
    value?: string;
    image?: ResponsiveImageProps;
    size?: Scale;
    className?: string;
    style?: StyleProp<ViewStyle>;
  };

export default function Avatar({ value, image, size }: AvatarProps) {
    const { isDark } = useTheme();
    return (
        <ScaledText className='rounded-full' style={{ backgroundColor: "lightgray", fontWeight: "bold", ...spacing.p(16) }} size='base'>{value.slice(0, 2).toUpperCase() ?? null}</ScaledText>
    );
};