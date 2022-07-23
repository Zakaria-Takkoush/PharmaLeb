import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCallback } from "react";
import { Button } from "react-native";
import { Favorites } from "../screens/Patient/Favorites";
import { MedicineScreen } from "../screens/Patient/MedicineScreen";
import { PharmacyScreen } from "../screens/Patient/PharmacyScreen";
import FavoritesProvider from "../stores/FavoritesContext";

// In this file, we are creating a stack within the home tab
// where pressing each medicine navigates to the medicine page

const Stack = createNativeStackNavigator();

export const PatientFavoritesStack = () => {
    return (
        <FavoritesProvider>
            <NavigationContainer independent="true">
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: "#009FFF",
                        },
                        headerTintColor: "#fff",
                        headerTitleAlign: "center",
                        headerTitleStyle: {
                            fontWeight: "bold",
                        },
                    }}
                >
                    <Stack.Screen name="Favorites" component={Favorites} />
                    <Stack.Screen name="Medicine" component={MedicineScreen} />
                    <Stack.Screen name="Pharmacy" component={PharmacyScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </FavoritesProvider>
    );
};
