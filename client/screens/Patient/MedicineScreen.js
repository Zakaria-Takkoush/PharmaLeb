import { StyleSheet, Text, View, ScrollView, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { MedicineScreenDetails } from "../../components/MedicineScreenDetails";
import { PharmacyCard } from "../../components/PharmacyCard";
import globalStyles from "../../styles/GlobalStyles";
import axiosAPI from "../../apis/axiosAPI";
import { getValueFor } from "../../stores/SecureStore";

export const MedicineScreen = ({ route, navigation }) => {
    const medicine = route.params;

    const [pharmacies, setPharmacies] = useState([]);

    // send notification function
    const sendNotification = async () => {
        const pushToken = await getValueFor("push_token");
        const message = {
            to: pushToken,
            sound: "default",
            title: `Available Medicine!`,
            body: `${medicine.name}`,
        };

        await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Accept-encoding": "gzip, deflate",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(message),
        });
    };

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

    // send notification only if the medicine is available
    if (pharmaciesWithStock.length > 0) {
        sendNotification();
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
