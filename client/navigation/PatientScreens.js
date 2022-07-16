import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { PatientBottomTab } from "./PatientBottomTab";

export const PatientScreens = () => {
    return (
        <NavigationContainer>
            <PatientBottomTab />
        </NavigationContainer>
    );
};
