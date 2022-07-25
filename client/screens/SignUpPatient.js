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
    Modal,
    Dimensions,
} from "react-native";

// import map tools and components
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";

// logo
import logo from "../assets/logo/logo.png";

// import custom button
import { BlueButton } from "../components/BlueButton";

// import global styles
import globalStyles from "../styles/GlobalStyles";

// import icons
import { Ionicons } from "@expo/vector-icons";

// import axios file
import axiosAPI from "../apis/axiosAPI";

// import formik
import { Formik } from "formik";

// import yup for form validation
import * as yup from "yup";

// create yup validation schema
const registerSchema = yup.object({
    first_name: yup
        .string()
        .min(3, "First name must be at least 3 characters.")
        .max(30, "First name must be at most 30 characters.")
        .required("First name is required."),
    last_name: yup
        .string()
        .min(3, "Last name must be at least 3 characters.")
        .max(30, "Last name must be at most 30 characters.")
        .required("Last name is required."),
    email: yup
        .string()
        .email("Email is not valid")
        .required("Email is required."),
    password: yup
        .string()
        .min(6, "Password should be at least 6 characters long.")
        .required("Password is required."),
    confirm_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords do not match."),
    date_of_birth: yup.date("Enter a valid date"),
    phone_number: yup.number().min(8).required("Phone number is required."),
});

export const SignUpPatient = ({ navigation }) => {
    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        date_of_birth: "",
        phone_number: "",
    };

    // const [user, setUser] = useState(initialState);

    // if an error comes from the backend, handle it...
    // eg: user already exists

    // is there an error?
    const [isError, setIsError] = useState(false);
    // error message
    const [errorMessage, setErrorMessage] = useState("");

    // set user location
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

    // set all User Data
    const registerUser = (data) => {
        let user = {
            ...data,
            user_type: "patient",
            location: location,
        };
        postUser(user);
    };

    // Post user to Database
    const postUser = async (user) => {
        try {
            const res = await axiosAPI.post("/users/register", user);
            console.log(res.data);
            alert(
                `Welcome to PharmaLeb ${res.data.first_name}... Now login into your account`
            );
            navigation.navigate("Log In");
        } catch (error) {
            console.log(error.response.data);
            // setIsError(true);
            // setErrorMessage(error.response.data);
            alert(error.response.data);
        }
    };

    return (
        <TouchableWithoutFeedback
            // remove keyboard when touching the screen
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={(values, actions) => {
                    registerUser(values);
                    actions.resetForm();
                }}
                validationSchema={registerSchema}
            >
                {(props) => (
                    <View style={globalStyles.container}>
                        {/* Logo */}
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
                                    {/* Check validation */}
                                    {props.touched.first_name &&
                                        props.errors.first_name && (
                                            <Text style={styles.error}>
                                                {props.errors.first_name}
                                            </Text>
                                        )}
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
                                    {/* Check validation */}
                                    {props.touched.last_name &&
                                        props.errors.last_name && (
                                            <Text style={styles.error}>
                                                {props.errors.last_name}
                                            </Text>
                                        )}
                                </View>
                            </View>

                            <Text style={globalStyles.label}>Email:</Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder="Enter your email..."
                                autoCapitalize="none"
                                keyboardType="email-address"
                                onChangeText={props.handleChange("email")}
                                value={props.values.email}
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
                            {/* Check validation */}
                            {props.touched.password &&
                                props.errors.password && (
                                    <Text style={styles.error}>
                                        {props.errors.password}
                                    </Text>
                                )}

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
                            {/* Check validation */}
                            {props.touched.confirm_password &&
                                props.errors.confirm_password && (
                                    <Text style={styles.error}>
                                        {props.errors.confirm_password}
                                    </Text>
                                )}

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
                            {/* Check validation */}
                            {props.touched.date_of_birth &&
                                props.errors.date_of_birth && (
                                    <Text style={styles.error}>
                                        {props.errors.date_of_birth}
                                    </Text>
                                )}

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
                        </ScrollView>

                        {/* Create Account button */}
                        <BlueButton
                            text="Create Account!"
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
    error: {
        color: "tomato",
        fontSize: 12,
        fontWeight: "bold",
    },
});
