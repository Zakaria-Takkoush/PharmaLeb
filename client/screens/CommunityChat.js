import { useState, useEffect, useCallback, useContext } from "react";

// firebase functions
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot,
} from "firebase/firestore";
import { getFirestore } from "../config/firebase";

// import gifted chat package for chatting UI
import { GiftedChat } from "react-native-gifted-chat";

import { UserContext } from "../stores/UserContext";

export const CommunityChat = () => {
    const [messages, setMessages] = useState([]);

    const { userData } = useContext(UserContext);

    // messages database
    const db = getFirestore();

    useEffect(() => {
        const collectionRef = collection(db, "community_chats");
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
    }, [messages]);

    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        const { _id, createdAt, text, user } = messages[0];
        addDoc(collection(db, "community_chats"), {
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
            renderUsernameOnMessage={true}
            onSend={(messages) => onSend(messages)}
            user={{
                _id: userData._id,
                avatar: userData.photo,
                name: userData.first_name,
            }}
        />
    );
};
