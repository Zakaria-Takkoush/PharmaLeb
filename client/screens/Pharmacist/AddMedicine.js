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

export const AddMedicine = () => {
    // medicine list
    const [medicines, setMedicines] = useState([]);

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
        };
        getData();
    }, []);

    return (
        <View style={globalStyles.pageContainer}>
            <View style={styles.search}>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Search items..."
                />
                <BlueButton text="Search" />
            </View>
            <FlatList
                style={globalStyles.itemList}
                keyExtractor={(item) => item._id}
                data={medicines}
                renderItem={({ item }) => <AddItemCard data={item} />}
            />
            {/* <AddItemCard />
                <AddItemCard />
                <AddItemCard />
                <AddItemCard />
                <AddItemCard /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    search: {
        paddingHorizontal: 30,
        alignSelf: "stretch",
    },
});
