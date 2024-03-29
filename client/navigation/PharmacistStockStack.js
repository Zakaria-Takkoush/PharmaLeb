import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens
import { MedicineStock } from "../screens/Pharmacist/MedicineStock";
import { Stock } from "../screens/Pharmacist/Stock";
import { AddMedicine } from "../screens/Pharmacist/AddMedicine";

// In this file, we are creating a stack within the stock tab
// where pressing each medicine navigates to the medicine edit stock page

const Stack = createNativeStackNavigator();

export const PharmacistStockStack = () => {
    return (
        <NavigationContainer independent="true">
            <Stack.Navigator
                initialRouteName="Items"
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
                <Stack.Screen name="Items" component={Stock} />
                <Stack.Screen
                    name="Medicine Stock"
                    component={MedicineStock}
                    options={{ title: "Edit Item Stock" }}
                />
                <Stack.Screen name="Add Item" component={AddMedicine} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
