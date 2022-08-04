import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// import screens
import { PharmacistStockStack } from "./PharmacistStockStack";
import { Profile } from "../screens/Pharmacist/Profile";
import { EditPharmacy } from "../screens/Pharmacist/EditPharmacy";
import { PharmacistChatStack } from "./PharmacistChatStack";

// import icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

// create tab
const Tab = createBottomTabNavigator();

export const PharmacistBottomTab = () => {
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
            {/* Stock Tab */}
            <Tab.Screen
                name="Stock"
                component={PharmacistStockStack}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <MaterialIcons
                            name="medical-services"
                            size={35}
                            color={focused ? "#009FFF" : "#959595"}
                        />
                    ),
                    headerShown: false,
                }}
            />

            {/* Chats Tab */}
            <Tab.Screen
                name="Chat Stack"
                component={PharmacistChatStack}
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

            {/* Edit Pharmacy Tab */}
            <Tab.Screen
                name="Pharmacy"
                component={EditPharmacy}
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
