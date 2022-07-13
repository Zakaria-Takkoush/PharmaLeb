import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
export const BlueButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.button_text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#009FFF",
        borderRadius: 20,
        padding: 10,
        width: 150,
        margin: 20,
    },
    button_text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
    },
});
