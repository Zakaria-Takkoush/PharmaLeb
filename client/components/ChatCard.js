import { View, Text, StyleSheet } from "react-native";
import React from "react";

export const ChatCard = () => {
    return (
        <View style={styles.card}>
            <Text>ChatCard</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        minHeight: 75,
        alignSelf: "stretch",
        marginHorizontal: 20,
        marginVertical: 10,
        padding: 10,
        elevation: 5,
        backgroundColor: "#fff",
    },
});
