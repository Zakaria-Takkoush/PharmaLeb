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
import { useState } from "react";
import globalStyles from "../../styles/GlobalStyles";
import { Ionicons } from "@expo/vector-icons";
import defaultPic from "../../assets/default_profile_pic.png";
import { BlueButton } from "../../components/BlueButton";

import * as ImagePicker from "expo-image-picker";

export const Profile = () => {
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
