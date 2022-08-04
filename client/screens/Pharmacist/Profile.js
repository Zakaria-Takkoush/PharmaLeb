import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
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

// import axios file
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
    date_of_birth: yup.date("Enter a valid date"),
    phone_number: yup.number().min(8).required("Phone number is required."),
});

export const Profile = () => {
    const { userData, setUserData } = useContext(UserContext);

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
        first_name: userData?.first_name,
        last_name: userData?.last_name,
        date_of_birth: userData?.date_of_birth.split("T")[0],
        phone_number: userData?.phone_number,
    };

    // set user location
    const [location, setLocation] = useState({
        latitude: userData?.location?.latitude,
        longitude: userData?.location?.longitude,
    });

    // Map modal visibility set
    const [isMapOpen, setIsMapOpen] = useState(false);

    // Map properties
    const { width, height } = Dimensions.get("window");
    const aspectRatio = width / height;
    const latDelta = 0.02;
    const longDelta = latDelta * aspectRatio;
    const initialRegion = {
        latitude: userData?.location?.latitude,
        longitude: userData?.location?.longitude,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
    };
    const [region, setRegion] = useState(initialRegion);

    // set all User Data
    const handleSubmit = (data) => {
        let user = {
            ...data,
            location: location,
            photo: selectedImage ? selectedImage.localUri : userData.photo,
        };
        postEdit(user);
    };

    // post edits to backend
    const postEdit = async (data) => {
        try {
            const token = await getValueFor("token");
            const res = await axiosAPI.put(
                `/users/edit_prof/${userData._id}`,
                data,
                {
                    headers: {
                        "x-access-token": token,
                    },
                }
            );
            console.log(res.data);
            alert("Profile Updated Successfully!");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    // get user data on load (from context)
    useEffect(() => {
        const getData = async () => {
            await setUserData(userData);
        };
        getData();
    }, [userData]);

    return (
        <View style={globalStyles.container}>
            {userData && (
                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        handleSubmit(values);
                    }}
                    validationSchema={registerSchema}
                    enableReinitialize={false}
                >
                    {(props) => (
                        <ScrollView style={globalStyles.form}>
                            {selectedImage ? (
                                <Image
                                    source={{ uri: selectedImage.localUri }}
                                    style={styles.pic}
                                />
                            ) : (
                                <Image style={styles.pic} source={defaultPic} />
                            )}
                            <BlueButton
                                text="Pick image"
                                onPress={openImagePickerAsync}
                            />

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
                                        defaultValue={userData.first_name}
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
                                        defaultValue={userData.last_name}
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
                                defaultValue={
                                    userData.date_of_birth.split("T")[0]
                                }
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
                                defaultValue={userData.phone_number}
                            />
                            {/* Check validation */}
                            {props.touched.phone_number &&
                                props.errors.phone_number && (
                                    <Text style={styles.error}>
                                        {props.errors.phone_number}
                                    </Text>
                                )}

                            <Text style={globalStyles.label}>
                                Edit Location:
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

                            {/* Submit changes */}
                            <BlueButton
                                text="Submit Changes"
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
                        </ScrollView>
                    )}
                </Formik>
            )}
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
    error: {
        color: "tomato",
        fontSize: 12,
        fontWeight: "bold",
    },
});
