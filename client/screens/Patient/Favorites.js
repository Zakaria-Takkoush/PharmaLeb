import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, FlatList } from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import { FavoriteCard } from "../../components/FavoriteCard";
import { getValueFor } from "../../stores/SecureStore";
import axiosAPI from "../../apis/axiosAPI";
import { useIsFocused } from "@react-navigation/native";

export const Favorites = ({ navigation }) => {
    const [favorites, setFavorites] = useState([]);

    // use isFocused for screen reload on focus
    const isFocused = useIsFocused();

    // fetch favorites api
    const fetchFavorites = async () => {
        const user = await getValueFor("user_id");
        try {
            const res = await axiosAPI.get(`/users/fav/${user}`);
            const favorites = res.data.favorites;
            return favorites;
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const favoritesFromServer = await fetchFavorites();
            setFavorites(favoritesFromServer);
        };
        getData();
    }, [isFocused]);

    return (
        <View style={globalStyles.pageContainer}>
            <FlatList
                style={globalStyles.itemList}
                keyExtractor={(item) => item._id}
                data={favorites}
                renderItem={({ item }) => (
                    <FavoriteCard navigation={navigation} data={item} />
                )}
            />
        </View>
    );
};
