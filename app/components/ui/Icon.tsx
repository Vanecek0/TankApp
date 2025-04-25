import { ImageStyle, OpaqueColorValue, StyleProp, View } from 'react-native';
import CarRepair from "@/assets/images/car_repair.jsx";
import Home from "@/assets/images/home.jsx";
import MapPin from "@/assets/images/map_pin.jsx";
import Tank from "@/assets/images/tank.jsx";
import Car from "@/assets/images/car.jsx";

const MAPPING = {
    car_repair: CarRepair,
    home: Home,
    map_pin: MapPin,
    tank: Tank,
    car: Car,
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
    color?: string | OpaqueColorValue;
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