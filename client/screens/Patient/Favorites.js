import React, { useCallback, useEffect, useState } from "react";
import { Text, View, ScrollView, FlatList, StyleSheet } from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import { FavoriteCard } from "../../components/FavoriteCard";
import { getValueFor } from "../../stores/SecureStore";
import axiosAPI from "../../apis/axiosAPI";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

export const Favorites = ({ navigation, route }) => {
    const [favorites, setFavorites] = useState([]);

    // use isFocused for screen reload on focus
    const isFocused = useIsFocused();

    // Enable removing favorites
    const [canRemove, setCanRemove] = useState(false);

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

    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                const favoritesFromServer = await fetchFavorites();
                setFavorites(favoritesFromServer);
            };
            getData();
        }, [])
    );

    return (
        <View style={globalStyles.pageContainer}>
            <View style={styles.topHeader}>
                <Text style={styles.topHeaderText}>Your Favorites</Text>
                <Feather
                    name="edit"
                    size={35}
                    color="#009FFF"
                    onPress={() => {
                        setCanRemove(!canRemove);
                    }}
                />
            </View>
            <FlatList
                style={globalStyles.itemList}
                keyExtractor={(item) => item._id}
                data={favorites}
                renderItem={({ item }) => (
                    <FavoriteCard
                        navigation={navigation}
                        data={item}
                        canRemove={canRemove}
                        setFavorites={setFavorites}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    topHeader: {
        marginHorizontal: 30,
        marginVertical: 10,
        paddingHorizontal: 5,
        alignSelf: "stretch",
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    topHeaderText: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
