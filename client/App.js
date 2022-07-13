import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    FlatList,
} from "react-native";
// logo
import logo from "./assets/logo/Logo.jpg";
import { BlueButton } from "./components/BlueButton";
import { GreenButton } from "./components/GreenButton";

export default function App() {
    const [user, setUser] = useState({});

    return (
        <View style={styles.container}>
            {/* logo */}
            <Image source={logo} style={styles.logo} />
            {/* login form */}
            <View style={styles.form}>
                <Text style={styles.label}>Email:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter your email..."
                    onChangeText={(value) => {
                        setUser({ ...user, email: value });
                    }}
                />
                <Text style={styles.label}>Password:</Text>
                <TextInput
                    style={styles.input}
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
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    logo: {
        width: 305,
        height: 159,
        marginBottom: 10,
    },
    label: {
        textAlign: "left",
        fontSize: 14,
        marginBottom: 5,
        marginTop: 10,
        fontWeight: "bold",
    },
    form: {},
    input: {
        borderColor: "#959595",
        borderWidth: 1,
        borderRadius: 10,
        width: 300,
        padding: 10,
        margin: 5,
    },
    forgot: {
        color: "#009FFF",
        textDecorationLine: "underline",
    },
    member: {
        textAlign: "left",
        backgroundColor: "wheat",
        fontSize: 25,
        padding: 10,
        marginVertical: 10,
    },
});
