import React, {
    useContext,
    useEffect,
    useLayoutEffect,
    useState,
    useCallback,
} from "react";
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
    doc,
    getDoc,
} from "../../config/firebase";
import { UserContext } from "../../stores/UserContext";
import { GiftedChat } from "react-native-gifted-chat";

export const ChatScreen = ({ navigation, route }) => {
    const { userData } = useContext(UserContext);

    const chatID = route.params.id;

    const db = getFirestore();

    const [messages, setMessages] = useState([
        {
            _id: 0,
            text: "New chat created.",
            createdAt: new Date().getTime(),
            system: true,
        },
    ]);

    // Send message function
    // const handleSend = async (newMessage = []) => {
    //     const text = messages[0].text;

    //     await addDoc(collection(db, `chats/${chatID}`, "messages"), {
    //         text,
    //         createdAt: new Date().getTime(),
    //         user: {
    //             _id: userData._id,
    //         },
    //     })
    //         .then(() => setMsgInput(""))
    //         .catch((error) => alert(error.message));

    //     setMessages(GiftedChat.append(messages, newMessage));
    // };

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];

        addDoc(collection(db, `chats/${chatID}`, "messages"), {
            _id,
            createdAt,
            text,
            user,
        });
    }, []);

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

    const getMessages = async () => {
        const docRef = doc(db, "chats", chatID);
        const colRef = collection(docRef, "messages");
        const q = query(colRef, orderBy("createdAt", "desc"));
        const unsubscribe = onSnapshot(q, (snapshot) =>
            setMessages(
                snapshot.docs.map((doc) => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            )
        );
        return () => {
            unsubscribe();
        };
    };

    useEffect(() => {
        getMessages();
    }, []);

    const renderLoading = () => {
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#009FFF" />
        </View>;
    };

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={false}
            onSend={(messages) => onSend(messages)}
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
