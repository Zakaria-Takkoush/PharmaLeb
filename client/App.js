import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Image,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
// logo
import logo from "./assets/logo/Logo.jpg";
import { BlueButton } from "./components/BlueButton";
import { GreenButton } from "./components/GreenButton";
import { PharmacyCard } from "./components/PharmacyCard";
import { LoginStack } from "./routes/LoginStack";
// import global styles
import globalStyles from "./styles/GlobalStyles";

export default function App() {
    return <LoginStack />;
}

const styles = StyleSheet.create({});
