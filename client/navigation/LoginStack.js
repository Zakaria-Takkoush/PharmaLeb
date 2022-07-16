import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogIn } from "../screens/LogIn";
import { RegisterPharmacy } from "../screens/RegisterPharmacy";
import { SignUp } from "../screens/SignUpOptions";
import { SignUpPatient } from "../screens/SignUpPatient";
import { SignUpPHarmacist } from "../screens/SignUpPharmacist";
import { PatientBottomTab } from "./PatientBottomTab";

const Stack = createNativeStackNavigator();

export const LoginStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Log In" component={LogIn} />
                <Stack.Screen name="Sign Up" component={SignUp} />
                <Stack.Screen
                    name="Register as a User"
                    component={SignUpPatient}
                />
                <Stack.Screen
                    name="Register as a Pharmacist"
                    component={SignUpPHarmacist}
                />
                <Stack.Screen
                    name="Register Pharmacy"
                    component={RegisterPharmacy}
                />
                <Stack.Screen name="Patient" component={PatientBottomTab} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
