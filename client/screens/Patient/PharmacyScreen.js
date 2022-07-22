import { StyleSheet, Text, View, Linking, Platform } from "react-native";
import React from "react";
import globalStyles from "../../styles/GlobalStyles";
import { BlueButton } from "../../components/BlueButton";

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

    return (
        <View style={globalStyles.pageContainer}>
            <Text>{pharmacyDetails.name}</Text>
            <Text>Available Stock: {stock}</Text>
            <Text>Phone Number: {pharmacyDetails.phone_number}</Text>
            <BlueButton text="Call" onPress={openDialScreen} />
            <BlueButton text="Chat" />
        </View>
    );
};

const styles = StyleSheet.create({});
