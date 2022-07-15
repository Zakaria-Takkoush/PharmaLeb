import { StyleSheet } from "react-native";

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
});

export default globalStyles;
