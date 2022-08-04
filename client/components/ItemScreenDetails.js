import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";

export const ItemScreenDetails = ({ details }) => {
    return (
        <View style={styles.container}>
            <View style={styles.left}>
                <Image
                    source={{
                        uri: details.image,
                    }}
                    style={styles.image}
                />
            </View>
            <View style={styles.right}>
                <Text style={styles.name}>{details.name}</Text>
                <Text style={styles.detail}>Code: {details.code}</Text>
                <Text style={styles.detail}>Dosage {details.dosage}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignSelf: "stretch",
        marginVertical: 8,
        minHeight: 150,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 14,
        position: "relative",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    image: {
        width: 120,
        height: 120,
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
    },
    detail: {
        fontSize: 20,
    },
    icon: {
        position: "absolute",
        right: 15,
        bottom: 15,
    },
    left: {
        flexBasis: "40%",
    },
    right: {
        flexBasis: "60%",
    },
});
