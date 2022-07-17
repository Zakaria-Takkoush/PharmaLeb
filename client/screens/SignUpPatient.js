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
    ScrollView,
} from "react-native";
// logo
import logo from "../assets/logo/Logo.jpg";
import { BlueButton } from "../components/BlueButton";
// import global styles
import globalStyles from "../styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

export const SignUpPatient = () => {
    const initialState = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        date_of_birth: "",
    };

    const [user, setUser] = useState(initialState);

    const handleCLick = () => {
        console.log(user);
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <ScrollView>
                <View style={globalStyles.container}>
                    {/* logo */}
                    <Image source={logo} style={styles.logo} />

                    {/* Title */}
                    <Text style={styles.header}>Register as a User</Text>

                    {/* SignUp form */}
                    <View style={globalStyles.form}>
                        <View style={styles.fullname}>
                            <View style={styles.fname}>
                                <Text style={globalStyles.label}>
                                    First Name:
                                </Text>
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="First Name..."
                                    onChangeText={(value) => {
                                        setUser({ ...user, first_name: value });
                                    }}
                                />
                            </View>

                            <View style={styles.lname}>
                                <Text style={globalStyles.label}>
                                    Last Name:
                                </Text>
                                <TextInput
                                    style={globalStyles.input}
                                    placeholder="Last Name..."
                                    onChangeText={(value) => {
                                        setUser({ ...user, last_name: value });
                                    }}
                                />
                            </View>
                        </View>

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

                        <Text style={globalStyles.label}>
                            Confirm Password:
                        </Text>
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
                            placeholder="YYYY-MM-DD"
                            onChangeText={(value) => {
                                setUser({ ...user, date_of_birth: value });
                            }}
                        />

                        <Text style={globalStyles.label}>Phone Number:</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="Enter your phone number..."
                            onChangeText={(value) => {
                                setUser({ ...user, phone_number: value });
                            }}
                        />

                        <Text style={globalStyles.label}>Location:</Text>
                        <TouchableOpacity style={styles.location}>
                            <Ionicons
                                name="location"
                                size={30}
                                color="#009FFF"
                            />
                            <Text>Choose on Map</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Create Account button */}
                    <BlueButton text="Create Account!" onPress={handleCLick} />
                </View>
            </ScrollView>
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
    fullname: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    fname: {
        flex: 1,
    },
    lname: {
        flex: 1,
    },
    location: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
});
