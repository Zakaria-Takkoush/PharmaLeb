import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogIn } from "../screens/LogIn";
import { SignUp } from "../screens/SignUpOptions";
import { SignUpPatient } from "../screens/SignUpPatient";

const Stack = createNativeStackNavigator();

export const LoginStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name="Register as a User"
                    component={SignUpPatient}
                />
                <Stack.Screen name="Sign Up" component={SignUp} />
                <Stack.Screen name="Log In" component={LogIn} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
