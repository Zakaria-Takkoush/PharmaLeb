import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";

export const MedicineCardStock = ({ navigation, item }) => {
    let medicine = item.item;
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Medicine Stock", item)}
        >
            <View style={styles.left}>
                <Image source={{ uri: medicine.image }} style={styles.image} />
            </View>
            <View style={styles.right}>
                <Text style={styles.name}>{medicine.name}</Text>
                <Text style={styles.detail}>Code: {medicine.code}</Text>
                <Text style={styles.detail}>Dosage: {medicine.dosage}</Text>
                <Text style={styles.detail}>Stock: {item.stock}</Text>
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
