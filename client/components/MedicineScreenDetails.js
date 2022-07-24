import React, { useState } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
// import pic from "../assets/panadol.png";
import axiosAPI from "../apis/axiosAPI";
import { getValueFor } from "../stores/SecureStore";

export const MedicineScreenDetails = ({ details }) => {
    // add to favorites state check
    const [isAdded, setIsAdded] = useState(false);

    // add to favorites
    const addFavorite = async () => {
        const user = await getValueFor("user_id");
        try {
            const res = await axiosAPI.post(`users/fav/${user}`, {
                medicine: details._id,
            });
            if (res.data.favorite_added) {
                alert(`Added to Favorites!`);
                setIsAdded(true);
            } else {
                alert(res.data);
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image source={{ uri: details.image }} style={styles.image} />
            </View>
            <View style={styles.right}>
                <Text style={styles.name}>{details.name}</Text>
                <Text style={styles.detail}>{details.code}</Text>
                <Text style={styles.detail}>{details.dosage}</Text>
                <Text style={styles.detail}>{details.price}</Text>
            </View>
            {isAdded ? (
                <FontAwesome
                    style={styles.icon}
                    name="star"
                    size={35}
                    color="#009FFF"
                />
            ) : (
                <FontAwesome
                    style={styles.icon}
                    name="star-o"
                    size={35}
                    color="#009FFF"
                    onPress={addFavorite}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        marginVertical: 8,
        minHeight: 150,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 14,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    image: {
        width: 120,
        height: 120,
        // borderRadius: 20,
        // borderWidth: 2,
        // borderColor: "#009FFF",
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
    },
    detail: {
        fontSize: 20,
    },
    icon: {
        position: "absolute",
        right: 15,
        bottom: 15,
    },
    left: {
        flexBasis: "40%",
    },
    right: {
        flexBasis: "60%",
    },
});
