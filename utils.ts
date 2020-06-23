import {AsyncStorage} from "react-native";

export const saveDataToStorage = (token: string, userId: string, expirationDate: Date, name: string, avatar: string) => {
    AsyncStorage.setItem(
        'userData',
        JSON.stringify({
            token: token,
            userId: userId,
            expiryDate: expirationDate.toISOString(),
            userName: name,
            avatar: avatar
        })
    );
};