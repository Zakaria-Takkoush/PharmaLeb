import React from "react";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import { BlueButton } from "../../components/BlueButton";
import { MedicineCard } from "../../components/MedicineCard";

export const Home = ({ navigation }) => {
    return (
        <View style={globalStyles.pageContainer}>
            <View style={styles.search}>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Search for medicine..."
                />
                <BlueButton text="Search" />
            </View>
            <ScrollView style={globalStyles.itemList}>
                <MedicineCard navigation={navigation} />
                <MedicineCard navigation={navigation} />
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
