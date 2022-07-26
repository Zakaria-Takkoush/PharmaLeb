import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import {
    collection,
    addDoc,
    getFirestore,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
} from "../../config/firebase";
import { UserContext } from "../../stores/UserContext";

export const ChatScreen = ({ navigation, route }) => {
    const [msgInput, setMsgInput] = useState("");
    const [messages, setMessages] = useState([]);
    const db = getFirestore();

    const { user } = useContext(UserContext);

    // Send message function
    const sendMsg = async () => {
        Keyboard.dismiss();

        await addDoc(collection(db, `chats/${route.params.id}`, "messages"), {
            timestamp: serverTimestamp(),
            message: msgInput,
            displayName: user.first_name,
            email: user.email,
        })
            .then(() => setMsgInput(""))
            .catch((error) => alert(error.message));
    };

    useEffect(
        () =>
            onSnapshot(
                query(
                    collection(db, `chats/${route.params.id}`, "messages"),
                    orderBy("timestamp", "desc")
                ),
                (snapshot) => {
                    setMessages(
                        snapshot.docs.map((doc) => ({
                            id: doc.id,
                            ...doc.data(),
                        }))
                    );
                }
            ),
        [route]
    );

    return (
        <View>
            <Text>This is the Chat screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({});
