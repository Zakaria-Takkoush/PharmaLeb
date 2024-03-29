// This file holds global styles used in different app components and screens

import { Dimensions, StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F3F5F8",
    },
    form: {
        alignSelf: "stretch",
        paddingHorizontal: 30,
    },
    input: {
        borderColor: "#959595",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 5,
    },
    label: {
        textAlign: "left",
        fontSize: 14,
        marginBottom: 5,
        marginTop: 10,
        fontWeight: "bold",
    },

    // Text
    contentHeader: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#009FFF",
        marginVertical: 10,
    },
    contentDetails: {
        fontSize: 18,
    },

    // Navigation Pages
    pageContainer: {
        justifyContent: "flex-start",
        alignItems: "center",
        flex: 1,
    },
    itemList: {
        alignSelf: "stretch",
        padding: 10,
    },

    // Modal
    modalHeader: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 10,
        color: "#009FFF",
    },
    modalContainer: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
    },

    // Map
    map: {
        width: "100%",
        height: "50%",
        marginVertical: 15,
    },
});

export default globalStyles;
