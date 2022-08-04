import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import Screens
import { Profile } from "../screens/Patient/Profile";
import { PatientHomeStack } from "./PatientHomeStack";
import { PatientFavoritesStack } from "./PatientFavoritesStack";
import { PatientChatStack } from "./PatientChatStack";

// import Icons
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

// import favorites provider for context
import FavoritesProvider from "../stores/FavoritesContext";

// create tab
const Tab = createBottomTabNavigator();

export const PatientBottomTab = () => {
    return (
        // wrap the patient tab with favorites provider
        // to use favorites context
        <FavoritesProvider>
            <Tab.Navigator
                initialRouteName="Home Stack"
                screenOptions={{
                    tabBarShowLabel: false,
                    allowFontScaling: false,
                    tabBarHideOnKeyboard: true,
                    tabBarActiveTintColor: "#009FFF",
                    tabBarInactiveTintColor: "#959595",
                    tabBarStyle: { height: 55 },
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
                {/* Home Stack Tab */}
                <Tab.Screen
                    name="Home Stack"
                    component={PatientHomeStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Entypo
                                name="home"
                                size={35}
                                color={focused ? "#009FFF" : "#959595"}
                            />
                        ),
                        headerShown: false,
                    }}
                />

                {/* Favorites Stack Tab */}
                <Tab.Screen
                    name="Favorites Stack"
                    component={PatientFavoritesStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <FontAwesome
                                name="star"
                                size={35}
                                color={focused ? "#009FFF" : "#959595"}
                            />
                        ),
                        headerShown: false,
                    }}
                />

                {/* Chats Stack Tab */}
                <Tab.Screen
                    name="Chats Stack"
                    component={PatientChatStack}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <Ionicons
                                name="chatbubble-ellipses"
                                size={35}
                                color={focused ? "#009FFF" : "#959595"}
                            />
                        ),
                        headerShown: false,
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
        </FavoritesProvider>
    );
};
