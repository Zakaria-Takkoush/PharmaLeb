import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Modal,
    Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";

import { useFocusEffect } from "@react-navigation/native";

// import map tools and components
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";

// import global styles
import globalStyles from "../../styles/GlobalStyles";

// import icons
import { Ionicons } from "@expo/vector-icons";

// import secure store functions
import { getValueFor } from "../../stores/SecureStore";

// import axios file
import axiosAPI from "../../apis/axiosAPI";

// import button
import { BlueButton } from "../../components/BlueButton";

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

export const EditPharmacy = () => {
    // pharmacy data
    const [pharmacyData, setPharmacyData] = useState({ ...initialValues });

    // split address
    // const [city, street] = pharmacyData.address.split(" - ");

    // get pharmacy data
    const fetchPharmacy = async () => {
        const id = await getValueFor("pharmacy_id");
        try {
            const res = await axiosAPI.get(`/pharmacies/${id}`);
            const pharmacy = await res.data;
            return pharmacy;
        } catch (error) {
            console.log(error.response.data);
        }
    };

    // get Data on load
    useEffect(() => {
        const getData = async () => {
            const pharmacyFromServer = await fetchPharmacy();
            setPharmacyData(pharmacyFromServer);
        };
        getData();
    }, []);

    const initialValues = {
        name: pharmacyData.name,
        phone_number: pharmacyData.phone_number,
        city: pharmacyData.address,
        street: pharmacyData.address,
        owner: pharmacyData.owner,
    };

    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <View style={globalStyles.container}>
                {/* Title */}
                <Text style={styles.header}>Edit your Pharmacy</Text>

                {/* SignUp form */}
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        handleSubmit(values);
                        actions.resetForm();
                    }}
                    validationSchema={pharmacySchema}
                >
                    {(props) => (
                        <View style={globalStyles.form}>
                            <Text style={globalStyles.label}>
                                Pharmacy Name
                            </Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Enter Pharmacy Name..."
                                onChangeText={props.handleChange("name")}
                                value={props.values.name}
                                defaultValue={pharmacyData.name}
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
                                value={pharmacyData.address.split(" - ")[0]}
                                defaultValue={pharmacyData.address}
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
                                defaultValue={
                                    pharmacyData.address.split(" - ")[1]
                                }
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
                                defaultValue={pharmacyData.phone_number}
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

                            {/* Create Account button */}
                            <BlueButton
                                text="Submit Changes"
                                onPress={props.handleSubmit}
                            />
                        </View>
                    )}
                </Formik>
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
