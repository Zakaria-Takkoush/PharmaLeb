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

import {
    collection,
    getFirestore,
    onSnapshot,
    getDocs,
    query,
    where,
} from "../../config/firebase";
import { ChatCardPharmacist } from "../../components/ChatCardPharmacist";
import { getValueFor } from "../../stores/SecureStore";

import { useIsFocused } from "@react-navigation/native";
import { Loading } from "../../components/Loading";

export const Chat = ({ navigation }) => {
    const [chats, setChats] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    // from react-navigation
    const isFocused = useIsFocused();

    const db = getFirestore();

    const getChats = async () => {
        const pharmacyID = await getValueFor("pharmacy_id");
        const q = query(
            collection(db, "chats"),
            where("pharmacy", "==", pharmacyID)
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
                    Enter the community chat and get in touch with requests...
                </Text>
            </TouchableOpacity>

            {chats.map(({ id, userName }) => (
                <ChatCardPharmacist
                    key={id}
                    id={id}
                    userName={userName}
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
