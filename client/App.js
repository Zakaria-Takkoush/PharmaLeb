import { LoginStack } from "./navigation/LoginStack";
import PharmacyProvider from "./stores/PharmacyContext";
import UserProvider from "./stores/UserContext";

export default function App() {
    return (
        <UserProvider>
            <PharmacyProvider>
                <LoginStack />
            </PharmacyProvider>
        </UserProvider>
    );
}
