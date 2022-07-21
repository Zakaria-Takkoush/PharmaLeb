import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";

// import item details component
import { ItemScreenDetails } from "../../components/ItemScreenDetails";

// import global styles
import globalStyles from "../../styles/GlobalStyles";

// import icons
import { Ionicons } from "@expo/vector-icons";
import { BlueButton } from "../../components/BlueButton";
import axiosAPI from "../../apis/axiosAPI";
import { getValueFor } from "../../stores/SecureStore";

export const MedicineStock = ({ route }) => {
    // get item from params
    const item = route.params;

    // onPress of update button
    const handlePress = () => {
        updateStock();
    };

    // stock state
    const [stock, setStock] = useState(item.stock);

    // change stock
    const increment = () => {
        setStock(stock + 1);
    };
    const decrement = () => {
        if (stock > 0) {
            setStock(stock - 1);
        }
    };

    // update stock API
    const updateStock = async () => {
        const pharmacy = await getValueFor("pharmacy_id");
        try {
            const res = await axiosAPI.put(
                `/pharmacies/${pharmacy}/edit_stock`,
                {
                    id: item._id,
                    stock: stock,
                }
            );
            console.log(res.data);
            alert("Stock updated!");
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <View style={globalStyles.pageContainer}>
            <ItemScreenDetails details={item.item} />
            <Text style={styles.text}>Stock: {stock}</Text>
            <View style={styles.editStock}>
                <Ionicons
                    name="ios-remove-circle"
                    size={55}
                    color="tomato"
                    onPress={decrement}
                />
                <TextInput
                    style={[styles.inputStock, globalStyles.input]}
                    onChangeText={(value) => setStock(parseInt(value))}
                    value={stock.toString()}
                    keyboardType="numeric"
                />
                <Ionicons
                    name="ios-add-circle"
                    size={55}
                    color="green"
                    onPress={increment}
                />
            </View>
            <BlueButton text="Update Stock" onPress={handlePress} />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 18,
        fontWeight: "bold",
        alignSelf: "flex-start",
        marginLeft: 50,
    },
    editStock: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 50,
        marginVertical: 15,
    },
    inputStock: {
        fontSize: 20,
        flex: 1,
    },
});
