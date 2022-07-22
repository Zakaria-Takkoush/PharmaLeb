import {
    StyleSheet,
    Text,
    View,
    Linking,
    Platform,
    Dimensions,
} from "react-native";
import React from "react";
import globalStyles from "../../styles/GlobalStyles";
import { BlueButton } from "../../components/BlueButton";
import MapView, { PROVIDER_GOOGLE, Callout, Marker } from "react-native-maps";

export const PharmacyScreen = ({ route }) => {
    const stock = route.params.stock;
    const pharmacyDetails = route.params.details;

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
            <Text>{pharmacyDetails.name}</Text>
            <Text>Available Stock: {stock}</Text>
            <Text>Phone Number: {pharmacyDetails.phone_number}</Text>
            <BlueButton text="Call" onPress={openDialScreen} />
            <BlueButton text="Chat" />
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
});
