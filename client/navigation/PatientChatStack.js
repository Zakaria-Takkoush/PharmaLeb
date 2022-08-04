import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import screens
import { Chat } from "../screens/Patient/Chat";
import { ChatScreen } from "../screens/Patient/ChatScreen";
import { CommunityChat } from "../screens/CommunityChat";

// In this file, we are creating a stack within the chat tab
// where pressing each medicine navigates to the medicine page

const Stack = createNativeStackNavigator();

export const PatientChatStack = () => {
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
