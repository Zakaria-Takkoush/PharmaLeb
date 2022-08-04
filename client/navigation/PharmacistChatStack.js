import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Chat } from "../screens/Pharmacist/Chat";
import { ChatScreen } from "../screens/Pharmacist/ChatScreen";
import { CommunityChat } from "../screens/CommunityChat";

// In this file, we are creating a stack within the pharmacist chat tab

const Stack = createNativeStackNavigator();

export const PharmacistChatStack = () => {
    return (
        <Stack.Navigator
            initialRouteName="Chat"
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
            <Stack.Screen name="Chat" component={Chat} />
            <Stack.Screen name="Community Chat" component={CommunityChat} />
            <Stack.Screen
                name="Chat Screen"
                component={ChatScreen}
                options={({ route }) => ({
                    title: route.params.chatName,
                })}
            />
        </Stack.Navigator>
    );
};
