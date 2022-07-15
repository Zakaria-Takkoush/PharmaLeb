import React from "react";
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
import { BlueButton } from "../components/BlueButton";
import logo from "../assets/logo/Logo.jpg";
import globalStyles from "../styles/GlobalStyles";

export const SignUp = () => {
    return (
        <View style={globalStyles.container}>
            {/* logo */}
            <Image source={logo} style={styles.logo} />

            {/* text label */}
            <Text>I am a:</Text>

            {/* sign in button */}
            <BlueButton text="Patient" />

            {/* register button */}
            <BlueButton text="Pharmacist" />
        </View>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 305,
        height: 159,
        marginBottom: 10,
    },
});
