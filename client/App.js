import { LoginStack } from "./navigation/LoginStack";
import UserProvider from "./stores/UserContext";

export default function App() {
    return (
        <UserProvider>
            <LoginStack />
        </UserProvider>
    );
}
