import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export const PharmacyCard = () => {
    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>Pharmacy Name</Text>
            <Text style={styles.detail}>Location - Distance Away</Text>
            <Text style={styles.detail}>Available Stock</Text>
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
        padding: 12,
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
});
