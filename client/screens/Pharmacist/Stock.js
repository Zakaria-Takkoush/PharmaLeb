import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MedicineCardStock } from "../../components/MedicineCardStock";

export const Stock = () => {
    return (
        <View>
            <MedicineCardStock />
            <MedicineCardStock />
        </View>
    );
};

const styles = StyleSheet.create({});
