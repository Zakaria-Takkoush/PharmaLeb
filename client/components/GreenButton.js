import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
export const GreenButton = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.button_text}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#40C73D",
        borderRadius: 20,
        padding: 10,
        width: 200,
        margin: 15,
    },
    button_text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20,
        color: "white",
    },
});
