import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import { MedicineScreenDetails } from "../../components/MedicineScreenDetails";
import { PharmacyCard } from "../../components/PharmacyCard";
import globalStyles from "../../styles/GlobalStyles";

export const MedicineScreen = ({ route }) => {
    const medicine = route.params;
    return (
        <View style={globalStyles.pageContainer}>
            <MedicineScreenDetails details={medicine} />
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

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: 35,
    },
});
