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

import { useContext, useEffect, useState } from "react";
import globalStyles from "../../styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import defaultPic from "../../assets/default_profile_pic.png";
import { BlueButton } from "../../components/BlueButton";

// import image picker
import * as ImagePicker from "expo-image-picker";

import axiosAPI from "../../apis/axiosAPI";

// import formik
import { Formik } from "formik";
// import yup for form validation
import * as yup from "yup";
import { getValueFor } from "../../stores/SecureStore";
import { UserContext } from "../../stores/UserContext";

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

export const Profile = () => {
    // image state
    const [selectedImage, setSelectedImage] = useState(null);

    // image picker
    let openImagePickerAsync = async () => {
        let permissionResult =
            await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("Permission to access camera roll is required!");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync();
        console.log(pickerResult);

        if (pickerResult.cancelled === true) {
            return;
        }

        setSelectedImage({ localUri: pickerResult.uri });
    };

    // Initial field values
    const initialValues = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        date_of_birth: "",
        phone_number: "",
    };

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
    const handleSubmit = (data) => {
        let user = {
            ...data,
            // user_type: "pharmacist",
            location: location,
        };
    };

    // get user data
    const { userData } = useContext(UserContext);

    return (
        <View style={globalStyles.container}>
            <ScrollView style={globalStyles.form}>
                {selectedImage ? (
                    <Image
                        source={{ uri: selectedImage.localUri }}
                        style={styles.pic}
                    />
                ) : (
                    <Image source={defaultPic} style={styles.pic} />
                )}
                <BlueButton text="Pick image" onPress={openImagePickerAsync} />

                <View style={styles.fullname}>
                    <View style={styles.fname}>
                        <Text style={globalStyles.label}>First Name:</Text>
                        <TextInput
                            style={globalStyles.input}
                            placeholder="First Name..."
                            onChangeText={(value) => {
                                setUser({ ...user, first_name: value });
                            }}
                        />
                    </View>

                    <View style={styles.lname}>
                        <Text style={globalStyles.label}>Last Name:</Text>
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

                <Text style={globalStyles.label}>New Password:</Text>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Enter your password..."
                    secureTextEntry={true} // password
                    onChangeText={(value) => {
                        setUser({ ...user, password: value });
                    }}
                />

                <Text style={globalStyles.label}>Confirm new Password:</Text>
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

                <Text style={globalStyles.label}>Edit Location:</Text>
                <TouchableOpacity style={styles.location}>
                    <Ionicons name="location" size={30} color="#009FFF" />
                    <Text>Choose on Map</Text>
                </TouchableOpacity>
            </ScrollView>

            {/* Submit changes */}
            <BlueButton text="Save Changes" />
        </View>
    );
};

const styles = StyleSheet.create({
    pic: {
        width: 150,
        height: 150,
        marginVertical: 10,
        alignSelf: "center",
        borderRadius: 100,
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
