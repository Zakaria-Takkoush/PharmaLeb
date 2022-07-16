import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import medicine from "../assets/panadol.png";

export const MedicineScreenDetails = () => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image source={medicine} style={styles.image} />
            </View>
            <View style={styles.right}>
                <Text style={styles.name}>Medicine Name</Text>
                <Text style={styles.detail}>Code</Text>
                <Text style={styles.detail}>Dosage</Text>
            </View>
            <FontAwesome
                style={styles.icon}
                name="star-o"
                size={35}
                color="#009FFF"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        marginHorizontal: 20,
        marginVertical: 8,
        height: 150,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 14,
        position: "relative",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#009FFF",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
    },
    detail: {
        fontSize: 20,
    },
    icon: {
        position: "absolute",
        right: 15,
        bottom: 15,
    },
    left: {
        marginRight: 20,
    },
});
