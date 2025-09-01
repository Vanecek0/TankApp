import { Animated, View } from "react-native";
import TankDashboard from "./tank";

export default function Dashboard({ routePathName, className, scrollYValue }: {
    routePathName?: string;
    className?: string;
    scrollYValue?: Animated.Value;
}) {

    const renderDashboard = () => {
        switch (routePathName) {
            case "home":
                return <TankDashboard scrollYValue={scrollYValue!} />;
            case "/tank":
                return <TankDashboard scrollYValue={scrollYValue!}/>;
            default:
                return <TankDashboard scrollYValue={scrollYValue!}/>;
        }
    };

    return (
        <View className={`${className}`}>
            {renderDashboard()}
        </View>
    )
}