import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LogIn } from "../screens/LogIn";
import { SignUp } from "../screens/SignUpOptions";

const Stack = createNativeStackNavigator();

export const LoginStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="LogIn" component={LogIn} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
