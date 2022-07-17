import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { MedicineScreenDetails } from "../../components/MedicineScreenDetails";
import { PharmacyCard } from "../../components/PharmacyCard";
import globalStyles from "../../styles/GlobalStyles";

const MedicineScreen = () => {
    return (
        <View style={globalStyles.pageContainer}>
            <MedicineScreenDetails />
            <Text style={styles.text}>Available at:</Text>
            <ScrollView style={globalStyles.itemList}>
                <PharmacyCard />
                <PharmacyCard />
                <PharmacyCard />
                <PharmacyCard />
            </ScrollView>
        </View>
    );
};

export default MedicineScreen;

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: 35,
    },
});
