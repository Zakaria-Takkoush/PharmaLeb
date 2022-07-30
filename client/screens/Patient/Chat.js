import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
} from "react-native";
import { ChatCard } from "../../components/ChatCard";
import globalStyles from "../../styles/GlobalStyles";

import { useState, useEffect, useContext } from "react";

import {
    collection,
    getFirestore,
    onSnapshot,
    getDocs,
    query,
    where,
} from "../../config/firebase";
import { UserContext } from "../../stores/UserContext";

export const Chat = ({ navigation }) => {
    const { userData } = useContext(UserContext);

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
    };

    useEffect(() => {
        getChats();
    }, []);

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
