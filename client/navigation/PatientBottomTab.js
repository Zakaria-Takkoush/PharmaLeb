import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Chat } from "../screens/Patient/Chat";
import { Favorites } from "../screens/Patient/Favorites";
import { Home } from "../screens/Patient/Home";
import { Profile } from "../screens/Patient/Profile";
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const PatientBottomTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Entypo name="home" size={35} color="#959595" />
                    ),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome name="star" size={35} color="#959595" />
                    ),
                }}
            />
            <Tab.Screen
                name="Chats"
                component={Chat}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Ionicons
                            name="chatbubble-ellipses"
                            size={35}
                            color="#959595"
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <FontAwesome5
                            name="user-alt"
                            size={35}
                            color="#959595"
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
