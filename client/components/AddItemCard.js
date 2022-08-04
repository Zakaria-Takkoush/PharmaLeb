import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getValueFor } from "../stores/SecureStore";

// import axios file for API calls with baseURL
import axiosAPI from "../apis/axiosAPI";

export const AddItemCard = ({ data }) => {
    // handlePress
    const handlePress = () => {
        postItem();
    };

    // add medicine to pharmacy
    const postItem = async () => {
        const token = await getValueFor("token");
        const pharmacy = await getValueFor("pharmacy_id");
        try {
            const res = await axiosAPI.post(
                `/pharmacies/${pharmacy}/add_item`,
                {
                    item: data._id,
                },
                {
                    headers: {
                        "x-access-token": token,
                    },
                }
            );
            if (res.data.added_item) {
                alert("Medicine added to your stock!");
            } else {
                alert(res.data);
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <TouchableOpacity style={styles.card} onPress={handlePress}>
            <View style={styles.left}>
                <Image source={{ uri: data.image }} style={styles.image} />
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
