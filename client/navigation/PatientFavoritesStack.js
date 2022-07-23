import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Favorites } from "../screens/Patient/Favorites";
import { MedicineScreen } from "../screens/Patient/MedicineScreen";
import { PharmacyScreen } from "../screens/Patient/PharmacyScreen";

// In this file, we are creating a stack within the home tab
// where pressing each medicine navigates to the medicine page

const Stack = createNativeStackNavigator();

export const PatientHomeStack = () => {
    return (
        <NavigationContainer independent="true">
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Favorites" component={Favorites} />
                <Stack.Screen name="Medicine" component={MedicineScreen} />
                <Stack.Screen name="Pharmacy" component={PharmacyScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
