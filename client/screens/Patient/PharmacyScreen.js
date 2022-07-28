import {
    StyleSheet,
    Text,
    View,
    Linking,
    Platform,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import React from "react";
import globalStyles from "../../styles/GlobalStyles";
import { BlueButton } from "../../components/BlueButton";
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

import { collection, addDoc, getFirestore } from "../../config/firebase";

export const PharmacyScreen = ({ navigation, route }) => {
    const stock = route.params.stock;
    const pharmacyDetails = route.params.details;
    const distance = route.params.distance;

    // Create a new chat room
    const createChat = async () => {
        const db = getFirestore();
        await addDoc(collection(db, "chats"), {
            chatName: pharmacyDetails.name,
        })
            .then(() => navigation.goBack())
            .catch((error) => alert(error.message));
    };

    // Link to phone dialer
    const openDialScreen = () => {
        let number = "";
        if (Platform.OS === "ios") {
            number = `telprompt:${pharmacyDetails.phone_number}`;
        } else {
            number = `tel:${pharmacyDetails.phone_number}`;
        }
        Linking.openURL(number);
    };

    // Map properties
    const { width, height } = Dimensions.get("window");
    const aspectRatio = width / height;
    const latDelta = 0.02;
    const longDelta = latDelta * aspectRatio;
    const initialRegion = {
        latitude: pharmacyDetails.location.latitude,
        longitude: pharmacyDetails.location.longitude,
        latitudeDelta: latDelta,
        longitudeDelta: longDelta,
    };

    return (
        <View style={globalStyles.pageContainer}>
            <Text style={globalStyles.contentHeader}>
                {pharmacyDetails.name}
            </Text>
            <Text style={globalStyles.contentDetails}>
                Phone Number: {pharmacyDetails.phone_number}
            </Text>
            <Text style={globalStyles.contentDetails}>
                Address: {pharmacyDetails.address}
            </Text>
            <Text style={globalStyles.contentDetails}>
                {distance} km far away
            </Text>

            <Text style={globalStyles.contentDetails}>
                Available Stock: {stock}
            </Text>

            <View style={styles.actions}>
                {/* <BlueButton text="Call" onPress={openDialScreen} />
                <BlueButton text="Chat" onPress={createChat} /> */}
                <TouchableOpacity onPress={openDialScreen}>
                    <Ionicons name="call" size={50} color="#009FFF" />
                </TouchableOpacity>
                <TouchableOpacity onPress={createChat}>
                    <Ionicons
                        name="chatbox-ellipses-outline"
                        size={50}
                        color="#009FFF"
                    />
                </TouchableOpacity>
            </View>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                showsUserLocation={true}
                initialRegion={initialRegion}
            >
                <Marker
                    coordinate={{
                        latitude: pharmacyDetails.location.latitude,
                        longitude: pharmacyDetails.location.longitude,
                    }}
                    title={pharmacyDetails.name}
                    pinColor="#009FFF"
                ></Marker>
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
        width: "100%",
        height: "50%",
    },
    actions: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 20,
    },
});
