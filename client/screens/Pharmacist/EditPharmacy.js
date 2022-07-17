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
import React from "react";

// import global styles
import globalStyles from "../../styles/GlobalStyles";

// import icons
import { Ionicons } from "@expo/vector-icons";

import { BlueButton } from "../../components/BlueButton";

export const EditPharmacy = () => {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={globalStyles.container}>
                {/* Title */}
                <Text style={styles.header}>Edit your Pharmacy</Text>

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
                <BlueButton
                    text="Submit Changes"
                    onPress={() => alert("Hello")}
                />
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
