import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../stores/UserContext";
import haversine from "haversine-distance";

export const PharmacyCard = ({ details, medicine, navigation }) => {
    const { userData } = useContext(UserContext);

    // Find the distance of pharmacy with respect to user
    // haversine library helps in calculating the distance between 2 locations on earth
    const [distance, setDistance] = useState(0);

    const findDistance = () => {
        const pharmacyLocation = details.location;
        const userLocation = userData.location;
        const calculateDIstance = haversine(userLocation, pharmacyLocation);
        // convert distance to km (2 decimal places)
        const distanceAway = (calculateDIstance / 1000).toFixed(2);
        setDistance(distanceAway);
    };

    // Loop through items of the pharmacy and find the stock of this medicine
    const [stock, setStock] = useState(0);
    const findStock = () => {
        let items = details.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].item === medicine) {
                setStock(items[i].stock);
            }
        }
    };

    useEffect(() => {
        findDistance();
        findStock();
    }, []);

    return (
        <TouchableOpacity
            style={styles.card}
            onPress={() =>
                navigation.navigate("Pharmacy", { details, stock, distance })
            }
        >
            <Text style={styles.name}>{details.name}</Text>
            <Text style={styles.detail}>{distance} km away</Text>
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
