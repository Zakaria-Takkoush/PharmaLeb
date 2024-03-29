import { SafeAreaView, Text, TouchableOpacity, StyleSheet } from "react-native";
import { ChatCard } from "../../components/ChatCard";
import globalStyles from "../../styles/GlobalStyles";

import { useState, useEffect, useContext } from "react";

import { useIsFocused } from "@react-navigation/native";

// firebase functions
import {
    collection,
    getFirestore,
    onSnapshot,
    getDocs,
    query,
    where,
} from "../../config/firebase";

// loading component
import { Loading } from "../../components/Loading";

import { UserContext } from "../../stores/UserContext";

export const Chat = ({ navigation }) => {
    const { userData } = useContext(UserContext);

    const [isLoading, setIsLoading] = useState(true);

    const isFocused = useIsFocused();

    const [chats, setChats] = useState([]);

    const db = getFirestore();

    const getChats = async () => {
        const q = query(
            collection(db, "chats"),
            where("user", "==", userData._id)
        );
        const querySnapshot = await getDocs(q);
        let chats = [];
        querySnapshot.forEach((doc) => {
            chats.push({ id: doc.id, ...doc.data() });
        });
        setChats(chats);
        setIsLoading(false);
    };

    useEffect(() => {
        getChats();
    }, [isFocused]);

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat Screen", {
            id,
            chatName,
        });
    };

    if (isLoading) {
        return <Loading />;
    }

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

            {chats.map(({ id, pharmacyName }) => (
                <ChatCard
                    key={id}
                    id={id}
                    pharmacyName={pharmacyName}
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
