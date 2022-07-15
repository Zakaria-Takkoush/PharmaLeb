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

export const SignUpPatient = () => {
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

                {/* Title */}
                <Text style={styles.header}>Register as a User</Text>

                {/* SignUp form */}
                <View style={globalStyles.form}>
                    <Text style={globalStyles.label}>Name:</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter your name..."
                        onChangeText={(value) => {
                            setUser({ ...user, name: value });
                        }}
                    />

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

                    <Text style={globalStyles.label}>Confirm Password:</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter your password..."
                        secureTextEntry={true} // password
                        onChangeText={(value) => {
                            setUser({ ...user, confirm_password: value });
                        }}
                    />

                    <Text style={globalStyles.label}>Date of Birth:</Text>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Enter your password..."
                        onChangeText={(value) => {
                            setUser({ ...user, date_of_birth: value });
                        }}
                    />
                </View>

                {/* Create Account button */}
                <BlueButton text="Create Account!" />
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
});
