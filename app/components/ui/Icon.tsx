import { ImageStyle, OpaqueColorValue, StyleProp, View } from 'react-native';
import { Theme} from '@/constants/Colors';
import CarRepair from "@/assets/images/car_repair.jsx";
import Home from "@/assets/images/home.jsx";
import MapPin from "@/assets/images/map_pin.jsx";
import Tank from "@/assets/images/tank.jsx";
import Car from "@/assets/images/car.jsx";
import Bell from "@/assets/images/bell.jsx";
import Settings from "@/assets/images/settings.jsx";
import ChevronLeft from "@/assets/images/chevron_left.jsx";
import ChevronRight from "@/assets/images/chevron_right";
import ChevronDown from "@/assets/images/chevron_down";
import Moon from "@/assets/images/moon";
import Sun from "@/assets/images/sun";

const MAPPING = {
    car_repair: CarRepair,
    home: Home,
    map_pin: MapPin,
    tank: Tank,
    car: Car,
    bell: Bell,
    settings: Settings,
    chevron_left: ChevronLeft,
    chevron_right: ChevronRight,
    chevron_down: ChevronDown,
    moon: Moon,
    sun: Sun
} as const;

export type IconSrc = keyof typeof MAPPING;

export default function Icon({
    name,
    className,
    color,
    style,
}: {
    name: IconSrc;
    size?: number;
    color?: string | OpaqueColorValue | Theme;
    style?: StyleProp<ImageStyle>;
    className?: string;
}) {
    const SvgIcon = MAPPING[name];

    return (
        <View>
            <SvgIcon color={color} style={style} className={className} />
        </View>
    );
}