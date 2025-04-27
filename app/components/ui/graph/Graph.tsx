import { Text, View } from "react-native";
import TankGraph from "./graphs/TankGraph";
import DefaultGraph from "./graphs/DefaultGraph";

export default function Graph({ routePathName, className }: {
    routePathName?: string;
    className?: string;
}) {
    const renderGraph = () => {
        switch (routePathName) {
          case "/":
            return <DefaultGraph />;
          case "/tank":
            return <TankGraph />;
          case "/servis":
            return <Text className="text-center">Graf pro Expenses</Text>;
          default:
            return <DefaultGraph />;
        }
      };

      return (
        <View className={`${className}`}>
          {renderGraph()}
        </View>
      );
}