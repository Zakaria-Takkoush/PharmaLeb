import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axiosAPI from "../apis/axiosAPI";
import { getValueFor } from "../stores/SecureStore";
import { FavoritesContext } from "../stores/FavoritesContext";

export const MedicineScreenDetails = ({ details }) => {
    // add to favorites state check
    const [isAdded, setIsAdded] = useState(false);

    const { favorites, setFavorites } = useContext(FavoritesContext);

    // Check if this item is in the user's favorites list
    // Then set the item as isAdded
    const checkFavorite = () => {
        for (let i = 0; i < favorites.length; i++) {
            if (favorites[i].medicine._id === details._id) {
                setIsAdded(true);
                break;
            }
        }
    };

    // add to favorites
    const addFavorite = async () => {
        const user = await getValueFor("user_id");
        const token = await getValueFor("token");
        try {
            const res = await axiosAPI.post(
                `users/fav/${user}`,
                {
                    medicine: details._id,
                },
                {
                    headers: {
                        "x-access-token": token,
                    },
                }
            );
            if (res.data.favorite_added) {
                alert(`Added to Favorites!`);
                setIsAdded(true);
                const getMedicineDetails = await axiosAPI.get(
                    `/medicines/${res.data.favorite_added.medicine}`
                );
                const medicineAdded = getMedicineDetails.data;
                const favoriteObject = {
                    _id: res.data.favorite_added._id,
                    medicine: medicineAdded,
                };
                setFavorites([...favorites, favoriteObject]);
            } else {
                alert(res.data);
            }
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        checkFavorite();
    }, []);

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
