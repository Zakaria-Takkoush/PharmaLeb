import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import pic from "../assets/panadol.png";

export const FavoriteCard = ({ data }) => {
    const medicine = data.medicine;
    return (
        <TouchableOpacity style={styles.card}>
            <View style={styles.left}>
                <Image source={pic} style={styles.image} />
            </View>
            <View style={styles.right}>
                <Text style={styles.name}>{medicine.name}</Text>
                <Text style={styles.detail}>{medicine.code}</Text>
                <Text style={styles.detail}>{medicine.dosage}</Text>
                <Text style={styles.detail}>{medicine.price}</Text>
            </View>
            <FontAwesome
                style={styles.icon}
                name="remove"
                size={30}
                color="red"
            />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        alignSelf: "stretch",
        marginHorizontal: 20,
        marginVertical: 8,
        minHeight: 120,
        backgroundColor: "white",
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 14,
        elevation: 5,
        position: "relative",
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 20,
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
        bottom: 15,
        // display: "none",
    },
    left: {
        flex: 1,
    },
    right: {
        flex: 2,
    },
});
