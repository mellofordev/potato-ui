import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const getToken = async () => {
    var token=''
    try {
    const value = await AsyncStorage.getItem('token')
    token=value;
    
    } catch(e) {
    console.log(e);
    }
    return token;
    
}