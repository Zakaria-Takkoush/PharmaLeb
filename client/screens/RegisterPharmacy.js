import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
// logo
import logo from "../assets/logo/Logo.jpg";
import { BlueButton } from "../components/BlueButton";
// import global styles
import globalStyles from "../styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

import * as SecureStore from "expo-secure-store";

export const RegisterPharmacy = () => {
    useEffect(() => {
        const getAuth = async () => {
            const token = await SecureStore.getItemAsync("token");
            const userID = await SecureStore.getItemAsync("user_id");
            console.log(userID);
        };
        getAuth();
    }, []);

    const initialState = {
        name: "",
        phone_number: "",
        address: "",
    };

    const [city, setCity] = useState("");
    const [street, setStreet] = useState("");
    // const [address, setAddress] = useState(city + " - " + street);

    const [pharmacy, setPharmacy] = useState(initialState);

    const handleCLick = () => {
        console.log(pharmacy);
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={globalStyles.container}>
                {/* logo */}
                <Image source={logo} style={styles.logo} />

                {/* Title */}
                <Text style={styles.header}>Add your Pharmacy</Text>

                {/* SignUp form */}
                <View style={globalStyles.form}>
                    <Text style={globalStyles.label}>Pharmacy Name</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter Pharmacy Name..."
                        onChangeText={(value) => {
                            setPharmacy({ ...pharmacy, name: value });
                        }}
                    />

                    <Text style={globalStyles.label}>Full Address:</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="City..."
                        onChangeText={(value) => {
                            setCity(value);
                            setPharmacy({
                                ...pharmacy,
                                address: city + " - " + street,
                            });
                        }}
                    />
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Street..."
                        onChangeText={(value) => {
                            setStreet(value);
                            setPharmacy({
                                ...pharmacy,
                                address: city + " - " + street,
                            });
                        }}
                    />

                    <Text style={globalStyles.label}>Phone Number:</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter phone number..."
                        onChangeText={(value) => {
                            setPharmacy({ ...pharmacy, phone_number: value });
                        }}
                    />

                    <Text style={globalStyles.label}>Location:</Text>
                    <TouchableOpacity style={styles.location}>
                        <Ionicons name="location" size={30} color="#009FFF" />
                        <Text>Choose on Map</Text>
                    </TouchableOpacity>
                </View>

                {/* Create Account button */}
                <BlueButton text="Register Pharmacy" onPress={handleCLick} />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 220,
        height: 100,
        marginBottom: 10,
    },
    header: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#009FFF",
    },
    location: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
});
