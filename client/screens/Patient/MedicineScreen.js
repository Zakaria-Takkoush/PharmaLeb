import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { MedicineScreenDetails } from "../../components/MedicineScreenDetails";
import { PharmacyCard } from "../../components/PharmacyCard";
import globalStyles from "../../styles/GlobalStyles";
import axiosAPI from "../../apis/axiosAPI";

export const MedicineScreen = ({ route, navigation }) => {
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

    // filter pharmacies with only available stock for this medicine
    const pharmaciesWithStock = [];
    for (let i = 0; i < pharmacies.length; i++) {
        let items = pharmacies[i].items;
        for (let j = 0; j < items.length; j++) {
            if (items[j].item === medicine._id && items[j].stock > 0)
                pharmaciesWithStock.push(pharmacies[i]);
        }
    }

    return (
        <View style={globalStyles.pageContainer}>
            <MedicineScreenDetails details={medicine} />
            {pharmaciesWithStock.length > 0 ? (
                <Text style={styles.text}>Available at:</Text>
            ) : (
                <Text style={styles.text}>Not available right now</Text>
            )}

            <FlatList
                style={globalStyles.itemList}
                keyExtractor={(item) => item._id}
                data={pharmaciesWithStock}
                renderItem={({ item }) => (
                    <PharmacyCard
                        details={item}
                        medicine={medicine._id}
                        navigation={navigation}
                    />
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
