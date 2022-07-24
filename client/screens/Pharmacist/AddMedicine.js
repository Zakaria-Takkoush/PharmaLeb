import {
    StyleSheet,
    TextInput,
    Text,
    ScrollView,
    View,
    FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";

// import add item card
import { AddItemCard } from "../../components/AddItemCard";

// import global styles
import globalStyles from "../../styles/GlobalStyles";

// Import blue button
import { BlueButton } from "../../components/BlueButton";

// import axios
import axiosAPI from "../../apis/axiosAPI";
import { SafeAreaView } from "react-native-safe-area-context";

export const AddMedicine = () => {
    // medicine list
    const [medicines, setMedicines] = useState([]);

    // initialize search results array
    const [searchResults, setSearchResults] = useState([]);

    // on search input change
    const handleSearchChange = (value) => {
        if (!value) {
            setSearchResults(medicines);
        }
        const resultsArray = medicines.filter((medicine) =>
            medicine.name.toLowerCase().includes(value.toLowerCase())
        );
        setSearchResults(resultsArray);
    };

    // get medicine list
    const getMedicines = async () => {
        const res = await axiosAPI.get("/medicines");
        const medicines = await res.data;
        return medicines;
    };

    useEffect(() => {
        const getData = async () => {
            const medicinesFromServer = await getMedicines();
            setMedicines(medicinesFromServer);
            setSearchResults(medicinesFromServer);
        };
        getData();
    }, []);

    return (
        <SafeAreaView style={globalStyles.pageContainer}>
            <View style={styles.search}>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Search items..."
                    onChangeText={(value) => {
                        handleSearchChange(value);
                    }}
                />
            </View>
            <FlatList
                style={globalStyles.itemList}
                keyExtractor={(item) => item._id}
                data={searchResults}
                renderItem={({ item }) => <AddItemCard data={item} />}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    search: {
        paddingHorizontal: 30,
        alignSelf: "stretch",
    },
});
