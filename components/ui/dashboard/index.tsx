import { View } from "react-native";
import TankDashboard from "./tank";
import ServisDashboard from "./servis";
import StationDashboard from "./station";

export default function Dashboard({ routePathName, className }: {
    routePathName?: string;
    className?: string;
}) {

    const renderDashboard = () => {
        switch (routePathName) {
            case "home":
                return <TankDashboard routePathName={routePathName}/>;
            case "/tank":
                return <TankDashboard routePathName={routePathName}/>;
            /*case "/servis":
                return <ServisDashboard routePathName={routePathName} data={data}/>*/
            /*case "/station":
                return <StationDashboard routePathName={routePathName} data={data}/>;*/
            default:
                return <TankDashboard routePathName={routePathName}/>;
        }
    };

    return (
        <View className={`${className}`}>
            {renderDashboard()}
        </View>
    )
}