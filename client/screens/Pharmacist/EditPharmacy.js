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
import React, { useState, useEffect, useContext } from "react";

// import map tools and components
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

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
import { PharmacyContext } from "../../stores/PharmacyContext";

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
    const { pharmacyData, setPharmacyData } = useContext(PharmacyContext);

    const initialValues = {
        name: pharmacyData?.name,
        phone_number: pharmacyData?.phone_number,
        city: pharmacyData?.address?.split(" - ")[0],
        street: pharmacyData?.address?.split(" - ")[1],
    };

    // MAP
    // set pharmacy location
    const [location, setLocation] = useState({
        latitude: pharmacyData?.location?.latitude,
        longitude: pharmacyData?.location?.longitude,
    });

    // Map modal visibility set
    const [isMapOpen, setIsMapOpen] = useState(false);

    // Map properties
    const { width, height } = Dimensions.get("window");
    const aspectRatio = width / height;
    const latDelta = 0.02;
    const longDelta = latDelta * aspectRatio;
    const initialRegion = {
        latitude: pharmacyData?.location?.latitude,
        longitude: pharmacyData?.location?.longitude,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
    };
    const [region, setRegion] = useState(initialRegion);

    const handleSubmit = (data) => {
        const editedData = {
            name: data.name,
            phone_number: data.phone_number,
            address: `${data.city} - ${data.street}`,
            location: location,
            owner: pharmacyData?.owner,
        };
        editPharmacy(editedData);
    };

    // edit pharmacy
    const editPharmacy = async (data) => {
        const token = await getValueFor("token");
        try {
            const res = await axiosAPI.put(
                `/pharmacies/${pharmacyData._id}`,
                data,
                {
                    headers: {
                        "x-access-token": token,
                    },
                }
            );
            console.log(res.data);
            alert("Pharmacy edited successfully");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    // get Data on load
    useEffect(() => {
        const getData = async () => {
            await setPharmacyData(pharmacyData);
        };
        getData();
    }, [pharmacyData]);

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
                {pharmacyData && (
                    <Formik
                        initialValues={initialValues}
                        onSubmit={(values, actions) => {
                            handleSubmit(values);
                            actions.resetForm();
                        }}
                        validationSchema={pharmacySchema}
                        enableReinitialize={true}
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
                                    value={props.values.city}
                                    defaultValue={
                                        pharmacyData.address
                                        // pharmacyData.address.split(" - ")[0]
                                    }
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
                                        pharmacyData.address
                                        // pharmacyData.address.split(" - ")[1]
                                    }
                                />
                                {/* Check validation */}
                                {props.touched.street &&
                                    props.errors.street && (
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

                                <Text style={globalStyles.label}>
                                    Location:
                                </Text>
                                <TouchableOpacity
                                    style={styles.location}
                                    onPress={() => {
                                        setIsMapOpen(true);
                                    }}
                                >
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

                                {/* Map Modal (to set location) */}
                                <Modal
                                    visible={isMapOpen}
                                    animationType="slide"
                                >
                                    <View style={globalStyles.container}>
                                        <Text style={globalStyles.modalHeader}>
                                            Set your location
                                        </Text>
                                        <MapView
                                            provider={PROVIDER_GOOGLE}
                                            style={globalStyles.map}
                                            showsUserLocation={true}
                                            initialRegion={initialRegion}
                                            region={region}
                                            onRegionChangeComplete={(e) => {
                                                setRegion(e);
                                                setLocation({
                                                    latitude: e.latitude,
                                                    longitude: e.longitude,
                                                });
                                            }}
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude: region.latitude,
                                                    longitude: region.longitude,
                                                }}
                                                pinColor="#009FFF"
                                                draggable={true}
                                                onDragEnd={(e) => {
                                                    setLocation(
                                                        e.nativeEvent.coordinate
                                                    );
                                                    setRegion({
                                                        ...initialRegion,
                                                        ...e.nativeEvent
                                                            .coordinate,
                                                    });
                                                }}
                                            ></Marker>
                                        </MapView>
                                        <BlueButton
                                            text="Set Location"
                                            onPress={() => {
                                                setIsMapOpen(false);
                                                console.log(location);
                                            }}
                                        />
                                        <BlueButton
                                            text="Close"
                                            onPress={() => {
                                                setIsMapOpen(false);
                                            }}
                                        />
                                    </View>
                                </Modal>
                            </View>
                        )}
                    </Formik>
                )}
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
