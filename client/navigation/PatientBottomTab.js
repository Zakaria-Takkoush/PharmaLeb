import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Screens
import { Chat } from "../screens/Patient/Chat";
import { Favorites } from "../screens/Patient/Favorites";
import { Home } from "../screens/Patient/Home";
import { Profile } from "../screens/Patient/Profile";
import { PatientHomeStack } from "./PatientHomeStack";
import { PatientFavoritesStack } from "./PatientFavoritesStack";
import { PatientChatStack } from "./PatientChatStack";

// Import Icons
import { FontAwesome } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useCallback, useEffect } from "react";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import FavoritesProvider from "../stores/FavoritesContext";

const Tab = createBottomTabNavigator();

export const PatientBottomTab = () => {
    return (
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
                {/* Home Tab */}
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

                {/* Favorites Tab */}
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

                {/* Chats Tab */}
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
