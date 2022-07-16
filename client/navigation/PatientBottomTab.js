import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Chat } from "../screens/Patient/Chat";
import { Favorites } from "../screens/Patient/Favorites";
import { Home } from "../screens/Patient/Home";
import { Profile } from "../screens/Patient/Profile";
import { FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const PatientBottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Favorites" component={Favorites} />
            <Tab.Screen name="Chats" component={Chat} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
};
