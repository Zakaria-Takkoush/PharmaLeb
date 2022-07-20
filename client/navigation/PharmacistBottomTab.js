import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import Screens
import { PharmacistStockStack } from "./PharmacistStockStack";
import { Profile } from "../screens/Pharmacist/Profile";
import { Chat } from "../screens/Pharmacist/Chat";
import { EditPharmacy } from "../screens/Pharmacist/EditPharmacy";

// Import Icons
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import axiosAPI from "../apis/axiosAPI";
import { getValueFor, saveItem } from "../stores/SecureStore";
import { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

export const PharmacistBottomTab = () => {
    const [pharmacist, setPharmacist] = useState("");
    const [pharmacy, setPharmacy] = useState("");

    // get the pharmacist ID from secure store
    const getPharmacistData = async () => {
        const user = await getValueFor("user_id");
        return user;
    };

    // get the pharmacy ID knowing the user
    const getPharmacy = async () => {
        const res = await axiosAPI.get(`/pharmacies/owner/${pharmacist}`);
        const pharmacy = await res.data;
        saveItem("pharmacy_id", pharmacy._id);
        return pharmacy;
    };

    useEffect(() => {
        const getData = async () => {
            const pharmacist = await getPharmacistData();
            setPharmacist(pharmacist);
            console.log(pharmacist);
            const pharmacy = await getPharmacy();
            setPharmacy(pharmacy);
            console.log(pharmacy);
        };
        getData();
    }, []);

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
