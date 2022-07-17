import React from "react";
import { Text, View, ScrollView } from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import { FavoriteCard } from "../../components/FavoriteCard";

export const Favorites = () => {
    return (
        <View style={globalStyles.pageContainer}>
            <ScrollView style={globalStyles.itemList}>
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
            </ScrollView>
        </View>
    );
};
