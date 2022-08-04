import { useContext, useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from "react-native";
// logo
import logo from "../assets/logo/logo.png";

// import buttons
import { BlueButton } from "../components/BlueButton";
import { GreenButton } from "../components/GreenButton";

// import global styles
import globalStyles from "../styles/GlobalStyles";

// import axios file
import axiosAPI from "../apis/axiosAPI";

// import formik
import { Formik } from "formik";

// import yup for form validation
import * as yup from "yup";

// create yup validation schema
const logInSchema = yup.object({
    email: yup
        .string()
        .email("Email is not valid")
        .required("Email is required."),
    password: yup
        .string()
        .min(6, "Password should be at least 6 characters long.")
        .required("Password is required."),
});

// import Secure Store to store the token
import { getValueFor, saveItem } from "../stores/SecureStore";
import { UserContext } from "../stores/UserContext";
import { PharmacyContext } from "../stores/PharmacyContext";

export const LogIn = ({ navigation }) => {
    const initialValues = {
        email: "",
        password: "",
    };

    const { setUserData } = useContext(UserContext);
    const { setPharmacyData } = useContext(PharmacyContext);

    // login function (post to database and get token)
    const postLogIn = async (user) => {
        try {
            const res = await axiosAPI.post("/users/login", user);
            const loggedUser = res.data.user;
            Alert.alert("Welcome!", `Hello ${loggedUser.first_name}`, [
                { text: "OK" },
            ]);

            // store token in secure store
            saveItem("token", loggedUser.token);
            saveItem("user_id", loggedUser._id);

            // save data in user context store
            setUserData(loggedUser);

            // check user type and navigate accordingly
            if (loggedUser.user_type === "patient") {
                // use replace instead of navigate to prevent going back to login screen
                navigation.replace("Patient");
            }
            if (loggedUser.user_type === "pharmacist") {
                navigation.replace("Pharmacist");
                // get their pharmacy and save it in store
                getPharmacy(loggedUser._id);
            }
        } catch (error) {
            console.log(error.response.data);
            alert(error.response.data);
        }
    };

    // get the pharmacy knowing the user (fro pharmacists only)
    const getPharmacy = async (pharmacist) => {
        const token = await getValueFor("token");
        const res = await axiosAPI.get(`/pharmacies/owner/${pharmacist}`, {
            headers: {
                "x-access-token": token,
            },
        });
        const pharmacy = await res.data;
        saveItem("pharmacy_id", pharmacy._id);
        // console.log(pharmacy);
        setPharmacyData(pharmacy);
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    postLogIn(values);
                    actions.resetForm();
                }}
                validationSchema={logInSchema}
            >
                {(props) => (
                    <View style={globalStyles.container}>
                        {/* logo */}
                        <Image source={logo} style={styles.logo} />
                        {/* login form */}
                        <View style={globalStyles.form}>
                            <Text style={globalStyles.label}>Email:</Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Enter your email..."
                                onChangeText={props.handleChange("email")}
                                value={props.values.email}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            {/* Check validation */}
                            {props.touched.email && props.errors.email && (
                                <Text style={styles.error}>
                                    {props.errors.email}
                                </Text>
                            )}

                            <Text style={globalStyles.label}>Password:</Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Enter your password..."
                                secureTextEntry={true} // password
                                onChangeText={props.handleChange("password")}
                                value={props.values.password}
                            />
                            {props.touched.password &&
                                props.errors.password && (
                                    <Text style={styles.error}>
                                        {props.errors.password}
                                    </Text>
                                )}

                            {/* <TouchableOpacity>
                                <Text style={styles.forgot}>
                                    Forgot password?
                                </Text>
                            </TouchableOpacity> */}
                        </View>

                        {/* sign in button */}
                        <BlueButton
                            text="Sign In"
                            onPress={props.handleSubmit}
                        />

                        {/* register button */}
                        <GreenButton
                            text="Sign Up!"
                            onPress={() => navigation.navigate("Sign Up")}
                        />

                        {/* <PharmacyCard />
                <PharmacyCard /> */}
                    </View>
                )}
            </Formik>
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
    error: {
        color: "tomato",
        fontSize: 12,
        fontWeight: "bold",
    },
});
