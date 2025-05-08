import { View } from "react-native";
import TankDashboard from "./tank";
import ServisDashboard from "./servis";
import StationDashboard from "./station";

export default function Dashboard({ data, routePathName, className }: {
    data?: JSON;
    routePathName?: string;
    className?: string;
}) {

    const renderDashboard = () => {
        switch (routePathName) {
            case "home":
                return <TankDashboard routePathName={routePathName} data={data}/>;
            case "/tank":
                return <TankDashboard routePathName={routePathName} data={data}/>;
            case "/servis":
                return <ServisDashboard routePathName={routePathName} data={data}/>
            case "/statiom":
                return <StationDashboard routePathName={routePathName} data={data}/>;
            default:
                return <TankDashboard routePathName={routePathName} data={data}/>;
        }
    };

    return (
        <View className={`${className}`}>
            {renderDashboard()}
        </View>
    )
}