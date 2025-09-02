import { Animated, View } from "react-native";
import TankDashboard from "./tank";

export default function Dashboard({ routePathName, className, scrollRefVal}: {
    routePathName?: string;
    className?: string;
    scrollRefVal?: Animated.Value;
}) {
    const renderDashboard = () => {
        switch (routePathName) {
            case "home":
                return <TankDashboard scrollRefVal={scrollRefVal!} />;
            case "/tank":
                return <TankDashboard scrollRefVal={scrollRefVal!}/>;
            default:
                return <TankDashboard scrollRefVal={scrollRefVal!}/>;
        }
    };

    return (
        <View className={`${className}`}>
            {renderDashboard()}
        </View>
    )
}