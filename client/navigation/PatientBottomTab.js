import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Screens
import { Chat } from "../screens/Patient/Chat";
import { Favorites } from "../screens/Patient/Favorites";
import { Home } from "../screens/Patient/Home";
import { Profile } from "../screens/Patient/Profile";
import { PatientHomeStack } from "./PatientHomeStack";

// Import Icons
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const PatientBottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarShowLabel: false,
                allowFontScaling: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: "#009FFF",
                tabBarInactiveTintColor: "#959595",
                tabBarStyle: { height: 55 },
            }}
        >
            {/* Home Tab */}
            <Tab.Screen
                name="Home"
                component={PatientHomeStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Entypo
                            name="home"
                            size={35}
                            color={focused ? "#009FFF" : "#959595"}
                        />
                    ),
                }}
            />

            {/* Favorites Tab */}
            <Tab.Screen
                name="Favorites"
                component={Favorites}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome
                            name="star"
                            size={35}
                            color={focused ? "#009FFF" : "#959595"}
                        />
                    ),
                }}
            />

            {/* Chats Tab */}
            <Tab.Screen
                name="Chats"
                component={Chat}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Ionicons
                            name="chatbubble-ellipses"
                            size={35}
                            color={focused ? "#009FFF" : "#959595"}
                        />
                    ),
                }}
            />

            {/* Profile Tab */}
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <FontAwesome5
                            name="user-alt"
                            size={35}
                            color={focused ? "#009FFF" : "#959595"}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};
