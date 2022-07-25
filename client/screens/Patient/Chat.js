import React from "react";
import { Text, View } from "react-native";
import { ChatCard } from "../../components/ChatCard";
import globalStyles from "../../styles/GlobalStyles";

export const Chat = () => {
    return (
        <View style={globalStyles.container}>
            <ChatCard />
        </View>
    );
};
