import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home } from "../screens/Patient/Home";
import { MedicineScreen } from "../screens/Patient/MedicineScreen";

const Stack = createNativeStackNavigator();

export const PatientHomeStack = () => {
    return (
        <NavigationContainer independent="true">
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Medicine" component={MedicineScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
