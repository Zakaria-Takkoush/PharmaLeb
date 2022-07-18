import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import medicine from "../assets/panadol.png";

export const MedicineCardStock = ({ navigation }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Medicine Stock")}
        >
            <View style={styles.left}>
                <Image source={medicine} style={styles.image} />
            </View>
            <View style={styles.right}>
                <Text style={styles.name}>Medicine Name</Text>
                <Text style={styles.detail}>Code:</Text>
                <Text style={styles.detail}>Dosage:</Text>
                <Text style={styles.detail}>Stock:</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        alignSelf: "stretch",
        marginHorizontal: 20,
        marginVertical: 8,
        height: 140,
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
