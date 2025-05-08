import { Text, View } from "react-native";
import TankGraph from "./graphs/TankGraph";

export default function Graph({ routePathName, data, className }: {
  routePathName?: string;
  data?: JSON;
  className?: string;
}) {
  const renderGraph = () => {
    switch (routePathName) {
      case "/":
        return <TankGraph data={data} />;
      case "/tank":
        return <TankGraph data={data} />;
      case "/servis":
        return <TankGraph data={data} />;
      case "/station":
        return <TankGraph data={data} />;
      default:
        return <TankGraph data={data} />;
    }
  };

  return (
    <View className={`${className}`}>
      {renderGraph()}
    </View>
  );
}