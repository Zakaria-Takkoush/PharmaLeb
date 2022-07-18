import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";

// import item details component
import { ItemScreenDetails } from "../../components/ItemScreenDetails";

// import global styles
import globalStyles from "../../styles/GlobalStyles";

// import icons
import { Ionicons } from "@expo/vector-icons";

export const MedicineStock = () => {
    const [stock, setStock] = useState(0);
    const increment = () => {
        setStock(stock + 1);
    };
    const decrement = () => {
        setStock(stock - 1);
    };

    return (
        <View style={globalStyles.pageContainer}>
            <ItemScreenDetails />
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
