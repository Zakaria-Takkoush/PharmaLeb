import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import medicine from "../assets/panadol.png";
import { Ionicons } from "@expo/vector-icons";

export const AddItemCard = ({ navigation, data }) => {
    console.log(data);
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => alert("Item Added to Stock!")}
        >
            <View style={styles.left}>
                <Image source={medicine} style={styles.image} />
            </View>
            <View style={styles.right}>
                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.detail}>{data.code}</Text>
                <Text style={styles.detail}>{data.dosage}</Text>
                <Text style={styles.detail}>{data.price}</Text>
            </View>
            <Ionicons
                style={styles.icon}
                name="ios-add-circle"
                size={25}
                color="#009FFF"
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
    },
    left: {
        flex: 1,
    },
    right: {
        flex: 2,
    },
});
