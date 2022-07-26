import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { ChatCard } from "../../components/ChatCard";
import globalStyles from "../../styles/GlobalStyles";

import { useState, useEffect } from "react";

export const Chat = () => {
    const [threads, setThreads] = useState([]);

    useEffect(() => {}, []);

    return (
        <SafeAreaView style={globalStyles.pageContainer}>
            <TouchableOpacity style={styles.comChat}>
                <Text style={styles.title}>Community Chat</Text>
                <Text style={styles.text}>
                    Enter the community chat and ask for a medicine...
                </Text>
            </TouchableOpacity>
            <ChatCard />
            <ChatCard />
            <ChatCard />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    comChat: {
        alignSelf: "stretch",
        height: 100,
        backgroundColor: "#009FFF",
        borderRadius: 20,
        marginHorizontal: 15,
        marginVertical: 15,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
    },
    text: {
        fontSize: 16,
        color: "#fff",
        textAlign: "center",
    },
});
