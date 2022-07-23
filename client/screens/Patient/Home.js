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

    // get all medicines api
    const getMedicines = async () => {
        const res = await axiosAPI.get(`/medicines`);
        return res.data;
    };

    useEffect(() => {
        const getData = async () => {
            const medicinesFromServer = await getMedicines();
            setMedicines(medicinesFromServer);
        };
        getData();
    }, []);

    return (
        <SafeAreaView style={globalStyles.pageContainer}>
            <View style={styles.search}>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Search for medicine..."
                />
                <BlueButton text="Search" />
            </View>
            <FlatList
                style={globalStyles.itemList}
                keyExtractor={(item) => item._id}
                data={medicines}
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
