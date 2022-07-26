import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
    collection,
    getFirestore,
    onSnapshot,
    query,
    orderBy,
} from "../config/firebase";
import { Avatar, ListItem } from "@rneui/base";

export const ChatCard = ({ id, chatName, enterChat }) => {
    const [chatMessages, setChatMessages] = useState([]);
    const db = getFirestore();

    useEffect(() =>
        onSnapshot(
            query(
                collection(db, `chats/${id}`, "messages"),
                orderBy("timestamp", "desc")
            ),
            (snapshot) => {
                setChatMessages(
                    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                );
            }
        )
    );

    return (
        <TouchableOpacity style={styles.card}>
            <Text style={styles.chatName}>{chatName}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        minHeight: 60,
        alignSelf: "stretch",
        marginHorizontal: 20,
        marginVertical: 8,
        padding: 10,
        elevation: 5,
        backgroundColor: "#fff",
        justifyContent: "center",
    },
    chatName: {
        fontSize: 20,
        fontWeight: "bold",
    },
});
