import { View, Text, StyleSheet } from "react-native";
import React from "react";

export const ChatCard = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.chatName}>ChatCard</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        minHeight: 60,
        alignSelf: "stretch",
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 10,
        elevation: 5,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    chatName: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
