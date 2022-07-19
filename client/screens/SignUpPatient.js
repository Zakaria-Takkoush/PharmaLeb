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
import logo from "../assets/logo/logo.png";
import { BlueButton } from "../components/BlueButton";
// import global styles
import globalStyles from "../styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";

// import formik
import { Formik } from "formik";

export const SignUpPatient = () => {
    // const initialState = {
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     password: "",
    //     confirm_password: "",
    //     date_of_birth: "",
    //     phone_number: "",
    // };

    // const [user, setUser] = useState(initialState);

    // set all User Data
    const registerUser = (data) => {
        let user = {
            ...data,
            user_type: "patient",
            location: { latitude: 12, longitude: 12 },
        };
        postUser(user);
    };

    // Post to Database
    const postUser = (user) => {
        console.log(user);
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <Formik
                initialValues={{
                    first_name: "",
                    last_name: "",
                    email: "",
                    password: "",
                    confirm_password: "",
                    date_of_birth: "",
                    phone_number: "",
                }}
                onSubmit={(values) => registerUser(values)}
            >
                {(props) => (
                    <View style={globalStyles.container}>
                        {/* logo */}
                        <Image source={logo} style={styles.logo} />

                        {/* Title */}
                        <Text style={styles.header}>Register as a User</Text>

                        {/* SignUp form */}
                        <ScrollView style={globalStyles.form}>
                            <View style={styles.fullname}>
                                <View style={styles.fname}>
                                    <Text style={globalStyles.label}>
                                        First Name:
                                    </Text>
                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder="First Name..."
                                        onChangeText={props.handleChange(
                                            "first_name"
                                        )}
                                        value={props.values.first_name}
                                    />
                                </View>

                                <View style={styles.lname}>
                                    <Text style={globalStyles.label}>
                                        Last Name:
                                    </Text>
                                    <TextInput
                                        style={globalStyles.input}
                                        placeholder="Last Name..."
                                        onChangeText={props.handleChange(
                                            "last_name"
                                        )}
                                        value={props.values.last_name}
                                    />
                                </View>
                            </View>

                            <Text style={globalStyles.label}>Email:</Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Enter your email..."
                                onChangeText={props.handleChange("email")}
                                value={props.values.email}
                            />

                            <Text style={globalStyles.label}>Password:</Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Enter your password..."
                                secureTextEntry={true} // password
                                onChangeText={props.handleChange("password")}
                                value={props.values.password}
                            />

                            <Text style={globalStyles.label}>
                                Confirm Password:
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Enter your password..."
                                secureTextEntry={true} // password
                                onChangeText={props.handleChange(
                                    "confirm_password"
                                )}
                                value={props.values.confirm_password}
                            />

                            <Text style={globalStyles.label}>
                                Date of Birth:
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="YYYY-MM-DD"
                                onChangeText={props.handleChange(
                                    "date_of_birth"
                                )}
                                value={props.values.date_of_birth}
                            />

                            <Text style={globalStyles.label}>
                                Phone Number:
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Enter your phone number..."
                                onChangeText={props.handleChange(
                                    "phone_number"
                                )}
                                value={props.values.phone_number}
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
                        </ScrollView>

                        {/* Create Account button */}
                        <BlueButton
                            text="Create Account!"
                            onPress={props.handleSubmit}
                        />
                    </View>
                )}
            </Formik>
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
