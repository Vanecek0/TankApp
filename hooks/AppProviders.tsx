import React from "react";
import { Provider as ReduxProvider } from "react-redux";
import { SQLiteProvider } from "expo-sqlite";
import { ThemeProvider } from "@/theme/ThemeProvider";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "@/store";
import { DatabaseProvider } from "@/database/databaseContext";
import { DropdownProvider } from "./useDropdown";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ReduxProvider store={store}>
                <DatabaseProvider>
                    <ThemeProvider>
                        <DropdownProvider>
                            <GestureHandlerRootView style={{ flex: 1 }}>
                                {children}
                            </GestureHandlerRootView>
                        </DropdownProvider>
                    </ThemeProvider>
                </DatabaseProvider>
        </ReduxProvider>
    );
};