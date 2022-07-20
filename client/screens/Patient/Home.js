import React, { useEffect } from "react";
import { Text, View, TextInput, StyleSheet, ScrollView } from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import { BlueButton } from "../../components/BlueButton";
import { MedicineCard } from "../../components/MedicineCard";

// import secure store functions
import { getValueFor } from "../../stores/SecureStore";

export const Home = ({ navigation }) => {
    useEffect(() => {
        const getToken = async () => {
            const token = await getValueFor("token");
            const userID = await getValueFor("user_id");
            console.log(userID);
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
