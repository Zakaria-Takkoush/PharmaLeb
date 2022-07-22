import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { MedicineScreenDetails } from "../../components/MedicineScreenDetails";
import { PharmacyCard } from "../../components/PharmacyCard";
import globalStyles from "../../styles/GlobalStyles";
import axiosAPI from "../../apis/axiosAPI";

export const MedicineScreen = ({ route }) => {
    const medicine = route.params;

    const [pharmacies, setPharmacies] = useState([]);

    // get pharmacies having this medicine
    const fetchPharmacies = async () => {
        try {
            const res = await axiosAPI.get(
                `/pharmacies/available/${medicine._id}`
            );
            const pharmacies = res.data.pharmacies;
            return pharmacies;
        } catch (error) {
            console.log(error.response.data);
        }
    };

    useEffect(() => {
        const getData = async () => {
            const pharmaciesFromServer = await fetchPharmacies();
            setPharmacies(pharmaciesFromServer);
        };
        getData();
    }, []);

    return (
        <View style={globalStyles.pageContainer}>
            <MedicineScreenDetails details={medicine} />
            <Text style={styles.text}>Available at:</Text>
            <FlatList
                style={globalStyles.itemList}
                keyExtractor={(item) => item._id}
                data={pharmacies}
                renderItem={({ item }) => (
                    <PharmacyCard details={item} medicine={medicine._id} />
                )}
            />
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
