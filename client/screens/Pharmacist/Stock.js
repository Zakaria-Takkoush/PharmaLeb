import {
    StyleSheet,
    TextInput,
    Text,
    ScrollView,
    View,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

// import medicine edit card
import { MedicineCardStock } from "../../components/MedicineCardStock";
import { useIsFocused } from "@react-navigation/native";

// import global styles
import globalStyles from "../../styles/GlobalStyles";

// import blue button
import { BlueButton } from "../../components/BlueButton";

import { Ionicons } from "@expo/vector-icons";
import { getValueFor } from "../../stores/SecureStore";
import axiosAPI from "../../apis/axiosAPI";
import { SafeAreaView } from "react-native-safe-area-context";

export const Stock = ({ navigation }) => {
    // // use isFocused to update the screen whenever loaded
    const isFocused = useIsFocused();

    const [items, setItems] = useState([]);

    // initialize search results array
    const [searchResults, setSearchResults] = useState([]);

    // on search input change
    const handleSearchChange = (value) => {
        if (!value) {
            setSearchResults(items);
        }
        const resultsArray = items.filter((item) =>
            item.item.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(resultsArray);
    };

    // fetch pharmacy's stock
    const getStock = async () => {
        const pharmacy = await getValueFor("pharmacy_id");
        const res = await axiosAPI.get(`/pharmacies/${pharmacy}/items`);
        const items = res.data.items;
        return items;
    };

    useEffect(() => {
        const getData = async () => {
            const itemsFromServer = await getStock();
            setItems(itemsFromServer);
            setSearchResults(itemsFromServer);
        };
        getData();
    }, []);

    return (
        <SafeAreaView style={globalStyles.pageContainer}>
            <View style={styles.search}>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Search items..."
                    onChangeText={(value) => handleSearchChange(value)}
                />
                <BlueButton text="Search" />
            </View>
            <FlatList
                style={globalStyles.itemList}
                keyExtractor={(item) => item._id}
                data={searchResults}
                renderItem={({ item }) => (
                    <MedicineCardStock navigation={navigation} item={item} />
                )}
            />
            {/* <Ionicons
                style={styles.icon}
                name="ios-add-circle"
                size={50}
                color="#009FFF"
            /> */}
            <View>
                <BlueButton
                    text="Add Item"
                    onPress={() => navigation.navigate("Add Item")}
                />
            </View>
        </SafeAreaView>
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
