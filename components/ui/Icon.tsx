import { ImageStyle, OpaqueColorValue, StyleProp, View } from 'react-native';
import { Theme} from '@/constants/Colors';
import CarRepair from "@/assets/images/car_repair.jsx";
import Home from "@/assets/images/home.jsx";
import MapPin from "@/assets/images/map_pin.jsx";
import Tank from "@/assets/images/tank.jsx";
import Car from "@/assets/images/car.jsx";
import Calc from "@/assets/images/calc.jsx";
import Bell from "@/assets/images/bell.jsx";
import Settings from "@/assets/images/settings.jsx";
import ChevronLeft from "@/assets/images/chevron_left.jsx";
import ChevronRight from "@/assets/images/chevron_right";
import ChevronDown from "@/assets/images/chevron_down";
import Moon from "@/assets/images/moon";
import Sun from "@/assets/images/sun";
import Calendar from "@/assets/images/calendar";
import Clock from "@/assets/images/clock";
import Bars from "@/assets/images/bars";
import Trending from "@/assets/images/trending";
import Average from "@/assets/images/average";
import Droplet from "@/assets/images/droplet";
import Speedometer from "@/assets/images/speedometer";
import Dollar from "@/assets/images/dollar";
import Users from "@/assets/images/users";

const MAPPING = {
    car_repair: CarRepair,
    home: Home,
    map_pin: MapPin,
    tank: Tank,
    car: Car,
    calc: Calc,
    bell: Bell,
    calendar: Calendar,
    clock: Clock,
    bars: Bars,
    trending: Trending,
    average: Average,
    droplet: Droplet,
    settings: Settings,
    chevron_left: ChevronLeft,
    chevron_right: ChevronRight,
    chevron_down: ChevronDown,
    moon: Moon,
    sun: Sun,
    speedometer: Speedometer,
    dollar: Dollar,
    users: Users,
} as const;

export type IconSrc = keyof typeof MAPPING;

export default function Icon({
    name,
    className,
    color,
    style,
    size
}: {
    name: IconSrc;
    color?: string | OpaqueColorValue | Theme;
    style?: StyleProp<ImageStyle>;
    className?: string;
    size?: number;
}) {
    const SvgIcon = MAPPING[name];

    return (
        <View>
            <SvgIcon color={color} style={[{width: size, height: size}, style]} className={className}  />
        </View>
    );
}