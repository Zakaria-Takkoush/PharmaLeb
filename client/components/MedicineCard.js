import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
// import pic from "../assets/panadol.png";

export const MedicineCard = ({ navigation, details }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Medicine", details)}
        >
            <View style={styles.left}>
                <Image source={{ uri: details.image }} style={styles.image} />
            </View>
            <View style={styles.right}>
                <Text style={styles.name}>{details.name}</Text>
                <Text style={styles.detail}>Code: {details.code}</Text>
                <Text style={styles.detail}>Dosage: {details.dosage}</Text>
                <Text style={styles.detail}>Price: {details.price}</Text>
            </View>
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
