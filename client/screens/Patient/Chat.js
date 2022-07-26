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

import { collection, getFirestore, onSnapshot } from "../../config/firebase";

export const Chat = ({ navigation }) => {
    const [chats, setChats] = useState([]);
    const db = getFirestore();

    useEffect(
        () =>
            onSnapshot(collection(db, "chats"), (snapshot) => {
                setChats(
                    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                );
            }),
        []
    );

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat Screen", {
            id,
            chatName,
        });
    };

    return (
        <SafeAreaView style={globalStyles.pageContainer}>
            <TouchableOpacity
                style={styles.comChat}
                onPress={() => navigation.navigate("Community Chat")}
            >
                <Text style={styles.title}>Community Chat</Text>
                <Text style={styles.text}>
                    Enter the community chat and ask for a medicine...
                </Text>
            </TouchableOpacity>

            {chats.map(({ id, chatName }) => (
                <ChatCard
                    key={id}
                    id={id}
                    chatName={chatName}
                    enterChat={enterChat}
                />
            ))}
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
