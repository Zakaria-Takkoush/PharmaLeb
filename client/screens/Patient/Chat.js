import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import { ChatCard } from "../../components/ChatCard";
import globalStyles from "../../styles/GlobalStyles";

export const Chat = () => {
    return (
        <SafeAreaView style={globalStyles.pageContainer}>
            <ChatCard />
            <ChatCard />
            <ChatCard />
        </SafeAreaView>
    );
};
