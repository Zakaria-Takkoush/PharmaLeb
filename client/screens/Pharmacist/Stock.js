import { StyleSheet, TextInput, Text, ScrollView, View } from "react-native";
import React from "react";

// import medicine edit card
import { MedicineCardStock } from "../../components/MedicineCardStock";

// import global styles
import globalStyles from "../../styles/GlobalStyles";

// import blue button
import { BlueButton } from "../../components/BlueButton";

import { Ionicons } from "@expo/vector-icons";

export const Stock = () => {
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
                <MedicineCardStock />
            </ScrollView>
            {/* <Ionicons
                style={styles.icon}
                name="ios-add-circle"
                size={50}
                color="#009FFF"
            /> */}
            <BlueButton text="Add Item" />
        </View>
    );
};

const styles = StyleSheet.create({
    search: {
        paddingHorizontal: 30,
        alignSelf: "stretch",
    },
    icon: {
        right: 0,
        bottom: 20,
    },
});
