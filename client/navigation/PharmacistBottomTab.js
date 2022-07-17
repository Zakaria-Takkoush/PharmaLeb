import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Screens

// Import Icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export const PatientBottomTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Stock"
            screenOptions={{
                tabBarShowLabel: false,
                allowFontScaling: false,
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: "#009FFF",
                tabBarInactiveTintColor: "#959595",
                tabBarStyle: { height: 55 },
            }}
        >
            {/* Stock Tab */}
            <Tab.Screen
                name="Stock"
                component={ManageStock}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name="medical"
                            size={35}
                            color={focused ? "#009FFF" : "#959595"}
                        />
                    ),
                }}
            />

            {/* Chats Tab */}
            <Tab.Screen
                name="Chat"
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

            {/* Edit Pharmacy Tab */}
            <Tab.Screen
                name="Pharmacy"
                component={ManagePharmacy}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name="local-pharmacy"
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