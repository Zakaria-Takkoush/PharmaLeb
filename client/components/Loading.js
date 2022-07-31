import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export const Loading = () => {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#009FFF" />
        </View>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
