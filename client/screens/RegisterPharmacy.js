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
    Modal,
    Dimensions,
} from "react-native";

// import map tools and components
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";

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

    // set pharmacy location
    const [location, setLocation] = useState({
        latitude: 33.896359,
        longitude: 35.479829,
    });

    // Map modal visibility set
    const [isMapOpen, setIsMapOpen] = useState(false);

    // Map properties
    const { width, height } = Dimensions.get("window");
    const aspectRatio = width / height;
    const latDelta = 0.02;
    const longDelta = latDelta * aspectRatio;
    const initialRegion = {
        latitude: 33.896359,
        longitude: 35.479829,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
    };
    const [region, setRegion] = useState(initialRegion);

    // Set pharmacy data to post
    const register = async (data) => {
        const user = await getValueFor("user_id");
        let pharmacy = {
            name: data.name,
            phone_number: data.phone_number,
            address: `${data.city} - ${data.street}`,
            owner: user,
            location: location,
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
                        </View>

                        {/* Create Account button */}
                        <BlueButton
                            text="Register Pharmacy"
                            onPress={props.handleSubmit}
                        />

                        {/* Map Modal (to set location) */}
                        <Modal visible={isMapOpen} animationType="slide">
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
                                                ...e.nativeEvent.coordinate,
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
