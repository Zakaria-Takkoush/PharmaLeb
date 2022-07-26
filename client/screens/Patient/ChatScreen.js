import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Keyboard,
    TouchableWithoutFeedback,
    ActivityIndicator,
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
import { GiftedChat } from "react-native-gifted-chat";

export const ChatScreen = ({ navigation, route }) => {
    const { userData } = useContext(UserContext);

    const chatID = route.params.id;

    const db = getFirestore();

    const [msgInput, setMsgInput] = useState("");
    const [messages, setMessages] = useState([
        {
            _id: 0,
            text: "New chat created.",
            createdAt: new Date().getTime(),
            system: true,
        },
        {
            _id: 1,
            text: `Hello ${userData.first_name}`,
            createdAt: new Date().getTime(),
            user: {
                _id: userData._id,
                name: userData.first_name,
            },
        },
    ]);

    // Send message function
    const handleSend = async (newMessage = []) => {
        const text = messages[0].text;
        // await addDoc(collection(db, `chats/${route.params.id}`, "messages"), {
        //     text,
        //     createdAt: new Date().getTime(),
        //     user: {
        //         _id: userData._id,
        //         email: userData.email,
        //     },
        // })
        //     // .then(() => setMsgInput(""))
        //     .catch((error) => alert(error.message));

        setMessages(GiftedChat.append(messages, newMessage));
    };

    // useEffect(
    //     () =>
    //         onSnapshot(
    //             query(
    //                 collection(db, `chats/${route.params.id}`, "messages"),
    //                 orderBy("timestamp", "desc")
    //             ),
    //             (snapshot) => {
    //                 setMessages(
    //                     snapshot.docs.map((doc) => ({
    //                         id: doc.id,
    //                         ...doc.data(),
    //                     }))
    //                 );
    //             }
    //         ),
    //     [route]
    // );

    const renderLoading = () => {
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#009FFF" />
        </View>;
    };

    return (
        <GiftedChat
            messages={messages}
            onSend={(newMessage) => handleSend(newMessage)}
            user={{
                _id: userData._id,
                name: userData.first_name,
            }}
            alwaysShowSend
            scrollToBottom
            renderLoading={renderLoading}
        />
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});
