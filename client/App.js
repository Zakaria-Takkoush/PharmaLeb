import { LoginStack } from "./navigation/LoginStack";
import UserProvider from "./stores/UserContext";

import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function App() {
    return (
        <UserProvider>
            <LoginStack />
        </UserProvider>
    );
}
