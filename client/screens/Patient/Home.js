import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    TextInput,
    StyleSheet,
    ScrollView,
    FlatList,
} from "react-native";
import globalStyles from "../../styles/GlobalStyles";
import { BlueButton } from "../../components/BlueButton";
import { MedicineCard } from "../../components/MedicineCard";

// import secure store functions
import { getValueFor } from "../../stores/SecureStore";
import axiosAPI from "../../apis/axiosAPI";
import { SafeAreaView } from "react-native-safe-area-context";

export const Home = ({ navigation }) => {
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

    // get all medicines api
    const getMedicines = async () => {
        const res = await axiosAPI.get(`/medicines`);
        return res.data;
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
                    placeholder="Search for medicine..."
                    onChangeText={(value) => handleSearchChange(value)}
                />
            </View>
            <FlatList
                style={globalStyles.itemList}
                keyExtractor={(item) => item._id}
                data={searchResults}
                renderItem={({ item }) => (
                    <MedicineCard navigation={navigation} details={item} />
                )}
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
