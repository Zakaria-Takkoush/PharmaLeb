import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { BlueButton } from "../components/BlueButton";
import logo from "../assets/logo/Logo.jpg";
import globalStyles from "../styles/GlobalStyles";

export const SignUp = ({ navigation }) => {
    return (
        <View style={globalStyles.container}>
            {/* logo */}
            <Image source={logo} style={styles.logo} />

            {/* text label */}
            <Text style={styles.text}>I am a:</Text>

            {/* sign in button */}
            <BlueButton
                text="Patient"
                onPress={() => navigation.navigate("Register as a User")}
            />

            {/* register button */}
            <BlueButton
                text="Pharmacist"
                onPress={() => navigation.navigate("Register as a Pharmacist")}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 305,
        height: 159,
        marginBottom: 150,
    },
    text: {
        fontWeight: "bold",
        fontSize: 18,
    },
});
