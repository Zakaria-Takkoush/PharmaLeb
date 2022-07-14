import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const PharmacyCard = () => {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>Pharmacy Name</Text>
            <Text style={styles.detail}>Location - Distance Away</Text>
            <Text style={styles.detail}>Available Stock</Text>
            <Ionicons
                style={styles.icon}
                name="call"
                size={35}
                color="#40C73D"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        alignSelf: "stretch",
        marginHorizontal: 20,
        marginVertical: 8,
        height: 100,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 14,
        elevation: 5,
        position: "relative",
        justifyContent: "space-between",
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    detail: {
        fontSize: 16,
    },
    icon: {
        position: "absolute",
        right: 15,
        top: 15,
    },
});
