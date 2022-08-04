import React, { useContext } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import axiosAPI from "../apis/axiosAPI";
import { getValueFor } from "../stores/SecureStore";
import { FavoritesContext } from "../stores/FavoritesContext";

export const FavoriteCard = ({
    data,
    navigation,
    canRemove,
    setSearchResults,
}) => {
    const medicine = data.medicine;

    const { favorites, setFavorites } = useContext(FavoritesContext);

    // delete favorite
    const removeFavorite = async () => {
        const user = await getValueFor("user_id");
        const token = await getValueFor("token");
        try {
            const res = await axiosAPI.delete(`/users/fav/${user}`, {
                data: {
                    id: data._id,
                },
                headers: {
                    "x-access-token": token,
                },
            });
            alert("Favorite Removed");
            filterAfterDelete(data._id);
        } catch (error) {
            console.log(error.message.data);
        }
    };

    const filterAfterDelete = (id) => {
        setFavorites((prevFavorites) =>
            prevFavorites.filter((favorite) => favorite._id != id)
        );
        setSearchResults((prevFavorites) =>
            prevFavorites.filter((favorite) => favorite._id != id)
        );
    };

    return (
        <TouchableOpacity
            style={[styles.card, canRemove && styles.removable]}
            onPress={() => navigation.navigate("Medicine", medicine)}
        >
            <View style={styles.left}>
                <Image source={{ uri: medicine.image }} style={styles.image} />
            </View>
            <View style={styles.right}>
                <Text style={styles.name}>{medicine.name}</Text>
                <Text style={styles.detail}>{medicine.code}</Text>
                <Text style={styles.detail}>{medicine.dosage}</Text>
                <Text style={styles.detail}>{medicine.price}</Text>
            </View>
            {canRemove && (
                <FontAwesome
                    style={styles.icon}
                    name="remove"
                    size={30}
                    color="tomato"
                    onPress={removeFavorite}
                />
            )}
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
    removable: {
        borderWidth: 1,
        borderColor: "tomato",
    },
});
