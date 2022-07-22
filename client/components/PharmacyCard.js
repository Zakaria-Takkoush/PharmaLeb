import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const PharmacyCard = ({ details, medicine }) => {
    // console.log(medicine);
    // console.log(details);

    // const [itemStock, setItemStock] = useState();

    // Loop through items of the pharmacy and find the stock of this medicine
    let stock = 0;
    let items = details.items;
    for (let i = 0; i < items.length; i++) {
        if (items[i].item === medicine) {
            stock = items[i].stock;
        }
    }
    // const index = items.findIndex((item) => {
    //     return item.item === medicine;
    // });
    // setItemStock(items[index].stock);

    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.name}>{details.name}</Text>
            <Text style={styles.detail}>Location - Distance Away</Text>
            <Text style={styles.detail}>Available Stock: {stock}</Text>
            <Ionicons
                style={styles.icon}
                name="call"
                size={35}
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
        height: 120,
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
