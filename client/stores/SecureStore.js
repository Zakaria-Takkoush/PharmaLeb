import * as SecureStore from "expo-secure-store";

export const saveItem = async (key, value) => {
    await SecureStore.setItemAsync(key, value);
};

export const getValueFor = async (key) => {
    let result = await SecureStore.getItemAsync(key);
    return result;
};
