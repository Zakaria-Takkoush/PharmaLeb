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
import { GreenButton } from "../components/GreenButton";
import { PharmacyCard } from "../components/PharmacyCard";
// import global styles
import globalStyles from "../styles/GlobalStyles";

export const LogIn = () => {
    const [user, setUser] = useState({});

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={globalStyles.container}>
                {/* logo */}
                <Image source={logo} style={styles.logo} />
                {/* login form */}
                <View style={globalStyles.form}>
                    <Text style={globalStyles.label}>Email:</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter your email..."
                        onChangeText={(value) => {
                            setUser({ ...user, email: value });
                        }}
                    />
                    <Text style={globalStyles.label}>Password:</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter your password..."
                        secureTextEntry={true} // password
                        onChangeText={(value) => {
                            setUser({ ...user, password: value });
                        }}
                    />
                    <TouchableOpacity>
                        <Text style={styles.forgot}>Forgot password?</Text>
                    </TouchableOpacity>
                </View>

                {/* sign in button */}
                <BlueButton text="Sign In" />

                {/* register button */}
                <GreenButton text="Sign Up!" />

                {/* <PharmacyCard />
                <PharmacyCard /> */}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    logo: {
        width: 305,
        height: 159,
        marginBottom: 10,
    },
    forgot: {
        color: "#009FFF",
        textDecorationLine: "underline",
    },
});
