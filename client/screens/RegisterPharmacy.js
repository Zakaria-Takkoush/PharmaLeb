import { useState, useEffect } from "react";
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
import logo from "../assets/logo/logo.png";

// import button
import { BlueButton } from "../components/BlueButton";

// import global styles
import globalStyles from "../styles/GlobalStyles";

// import icons
import { Ionicons } from "@expo/vector-icons";

// import secure store functions
import { getValueFor, saveItem } from "../stores/SecureStore";

// import axios file
import axiosAPI from "../apis/axiosAPI";

// import formik
import { Formik } from "formik";

// import yup validator
import * as yup from "yup";

// create yup validation schema
const pharmacySchema = yup.object({
    name: yup
        .string()
        .min(3, "Pharmacy name must be at least 3 characters.")
        .max(30, "Pharmacy name must be at most 30 characters.")
        .required("Pharmacy name is required."),
    city: yup.string().required("City is required."),
    street: yup.string().required("Street is required."),
    phone_number: yup
        .number()
        .min(8, "Enter a valid phone number")
        .required("Phone number is required."),
});

export const RegisterPharmacy = ({ navigation }) => {
    useEffect(() => {
        const getAuth = async () => {
            const pharmacist = await getValueFor("user_id");
            const token = await getValueFor("token");
        };
        getAuth();
    }, []);

    const initialValues = {
        name: "",
        phone_number: "",
        city: "",
        street: "",
        owner: "",
    };

    const getOwner = async () => {
        const pharmacist = await getValueFor("user_id");
        return pharmacist;
    };

    const register = async (data) => {
        let pharmacy = {
            name: data.name,
            phone_number: data.phone_number,
            address: `${data.city} - ${data.street}`,
            owner: await getOwner(),
            location: { latitude: 12, longitude: 12 },
        };
        postPharmacy(pharmacy);
    };

    const postPharmacy = async (pharmacy) => {
        try {
            const token = await getValueFor("token");
            const res = await axiosAPI.post("/pharmacies", pharmacy, {
                headers: {
                    "x-access-token": token,
                },
            });
            const registeredPharm = res.data;
            alert(
                `${registeredPharm.name} Pharmacy added successfully... Now login into your account`
            );
            // navigate back to login page
            navigation.replace("Log In");
        } catch (error) {
            console.log(error.response.data);
        }
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
                    register(values);
                    actions.resetForm();
                }}
                validationSchema={pharmacySchema}
            >
                {(props) => (
                    <View style={globalStyles.container}>
                        {/* logo */}
                        <Image source={logo} style={styles.logo} />

                        {/* Title */}
                        <Text style={styles.header}>Add your Pharmacy</Text>

                        {/* SignUp form */}
                        <View style={globalStyles.form}>
                            <Text style={globalStyles.label}>
                                Pharmacy Name
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Enter Pharmacy Name..."
                                onChangeText={props.handleChange("name")}
                                value={props.values.name}
                            />
                            {/* Check validation */}
                            {props.touched.name && props.errors.name && (
                                <Text style={styles.error}>
                                    {props.errors.name}
                                </Text>
                            )}

                            <Text style={globalStyles.label}>
                                Full Address:
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="City..."
                                onChangeText={props.handleChange("city")}
                                value={props.values.city}
                            />
                            {/* Check validation */}
                            {props.touched.city && props.errors.city && (
                                <Text style={styles.error}>
                                    {props.errors.city}
                                </Text>
                            )}

                            <TextInput
                                style={globalStyles.input}
                                placeholder="Street..."
                                onChangeText={props.handleChange("street")}
                                value={props.values.street}
                            />
                            {/* Check validation */}
                            {props.touched.street && props.errors.street && (
                                <Text style={styles.error}>
                                    {props.errors.street}
                                </Text>
                            )}

                            <Text style={globalStyles.label}>
                                Phone Number:
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Enter phone number..."
                                onChangeText={props.handleChange(
                                    "phone_number"
                                )}
                                value={props.values.phone_number}
                            />
                            {/* Check validation */}
                            {props.touched.phone_number &&
                                props.errors.phone_number && (
                                    <Text style={styles.error}>
                                        {props.errors.phone_number}
                                    </Text>
                                )}

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
                        <BlueButton
                            text="Register Pharmacy"
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
    location: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    error: {
        color: "tomato",
        fontSize: 12,
        fontWeight: "bold",
    },
});
