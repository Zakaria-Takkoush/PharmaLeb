import { SafeAreaView, Text, View } from "react-native";
import { ChatCard } from "../../components/ChatCard";
import globalStyles from "../../styles/GlobalStyles";
import {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback,
    useContext,
} from "react";
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
} from "firebase/firestore";
import { database } from "../../config/firebase";

import { GiftedChat } from "react-native-gifted-chat";

import { UserContext } from "../../stores/UserContext";

export const Chat = () => {
    const [messages, setMessages] = useState([]);

    const { userData } = useContext(UserContext);

    useEffect(() => {
        const collectionRef = collection(database, "chats");
        const q = query(collectionRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setMessages(
                querySnapshot.docs.map((doc) => ({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            );
        });
        return () => unsubscribe();
    }, []);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(database, "chats"), {
            _id,
            createdAt,
            text,
            user,
        });
    }, []);

    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage={true}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: userData._id,
                avatar: userData.photo,
                name: userData.first_name,
            }}
        />
    );
};
