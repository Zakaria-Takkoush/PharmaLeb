import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens
import { Favorites } from "../screens/Patient/Favorites";
import { MedicineScreen } from "../screens/Patient/MedicineScreen";
import { PharmacyScreen } from "../screens/Patient/PharmacyScreen";

// In this file, we are creating a stack within the favorites tab
// where pressing each medicine navigates to the medicine page

const Stack = createNativeStackNavigator();

export const PatientFavoritesStack = () => {
    return (
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
    );
};
