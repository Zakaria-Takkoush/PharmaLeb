import { StyleSheet, TextInput, Text, ScrollView, View } from "react-native";
import React from "react";

// import add item card
import { AddItemCard } from "../../components/AddItemCard";

// import global styles
import globalStyles from "../../styles/GlobalStyles";

// Import blue button
import { BlueButton } from "../../components/BlueButton";

export const AddMedicine = () => {
    return (
        <View style={globalStyles.pageContainer}>
            <View style={styles.search}>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Search items..."
                />
                <BlueButton text="Search" />
            </View>
            <ScrollView style={globalStyles.itemList}>
                <AddItemCard />
                <AddItemCard />
                <AddItemCard />
                <AddItemCard />
                <AddItemCard />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    search: {
        paddingHorizontal: 30,
        alignSelf: "stretch",
    },
});
