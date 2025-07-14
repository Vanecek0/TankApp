import { DrawerContentScrollView } from "@react-navigation/drawer";
import SettingsBar from ".";
import { Text } from "react-native";

export default function SettingsBarDrawer({ ...props }) {
    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ marginHorizontal: -12 }}>
            <Text>Test</Text>
        </DrawerContentScrollView>
    );
}