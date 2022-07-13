import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Button,
} from "react-native";
// logo
import logo from "./assets/logo/Logo.jpg";

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
                <Text style={styles.forgot}>Forgot password?</Text>
            </View>
            {/* sign in button */}
            <TouchableOpacity style={styles.button}>
                <Text style={styles.button_text}>Sign in</Text>
            </TouchableOpacity>
            {/* register button */}
            <TouchableOpacity style={styles.button_green}>
                <Text style={styles.button_text}>Sign Up!</Text>
            </TouchableOpacity>
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
    button: {
        marginTop: 20,
        backgroundColor: "#009FFF",
        borderRadius: 20,
        padding: 10,
        marginBottom: 30,
        width: 150,
    },
    button_green: {
        backgroundColor: "#40C73D",
        borderRadius: 20,
        padding: 10,
        width: 150,
    },
    button_text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
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
});
