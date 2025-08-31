import { View } from "react-native";
import TankDashboard from "./tank";

export default function Dashboard({ routePathName, className }: {
    routePathName?: string;
    className?: string;
}) {

    const renderDashboard = () => {
        switch (routePathName) {
            case "home":
                return <TankDashboard />;
            case "/tank":
                return <TankDashboard />;
            /*case "/servis":
                return <ServisDashboard routePathName={routePathName} data={data}/>*/
            /*case "/station":
                return <StationDashboard routePathName={routePathName} data={data}/>;*/
            default:
                return <TankDashboard />;
        }
    };

    return (
        <View className={`${className}`}>
            {renderDashboard()}
        </View>
    )
}