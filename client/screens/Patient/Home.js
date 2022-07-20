import React, { useEffect } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import { BlueButton } from "../../components/BlueButton";
import { MedicineCard } from "../../components/MedicineCard";
import * as SecureStore from "expo-secure-store";

export const Home = ({ navigation }) => {
    async function getToken() {
        const token = await SecureStore.getItemAsync("token");
    }

    useEffect(() => {
        const getToken = async () => {
            const token = await SecureStore.getItemAsync("token");
            console.log(token);
        };
        getToken();
    }, []);

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
