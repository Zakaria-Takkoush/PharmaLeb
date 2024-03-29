import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens
import { LogIn } from "../screens/LogIn";
import { RegisterPharmacy } from "../screens/RegisterPharmacy";
import { SignUp } from "../screens/SignUpOptions";
import { SignUpPatient } from "../screens/SignUpPatient";
import { SignUpPharmacist } from "../screens/SignUpPharmacist";

// import tabs
import { PatientBottomTab } from "./PatientBottomTab";
import { PharmacistBottomTab } from "./PharmacistBottomTab";

// create main stack
const Stack = createNativeStackNavigator();

export const LoginStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Log In"
                    component={LogIn}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Sign Up" component={SignUp} />
                <Stack.Screen
                    name="Register as a User"
                    component={SignUpPatient}
                />
                <Stack.Screen
                    name="Register as a Pharmacist"
                    component={SignUpPharmacist}
                />
                <Stack.Screen
                    name="Register Pharmacy"
                    component={RegisterPharmacy}
                />
                <Stack.Screen
                    name="Patient"
                    component={PatientBottomTab}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Pharmacist"
                    component={PharmacistBottomTab}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
