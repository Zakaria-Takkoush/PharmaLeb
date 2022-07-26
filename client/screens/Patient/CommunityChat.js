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
import { getFirestore } from "../../config/firebase";

import { GiftedChat } from "react-native-gifted-chat";

import { UserContext } from "../../stores/UserContext";

export const CommunityChat = () => {
    const [messages, setMessages] = useState([]);

    const { userData } = useContext(UserContext);

    const db = getFirestore();

    useEffect(() => {
        const collectionRef = collection(db, "chats");
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
