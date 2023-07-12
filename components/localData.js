import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getDataInLocalStorage = async (dataLabel) => {
    try {
    const info = await AsyncStorage.getItem(dataLabel);
    return info
    } catch(e) {
    throw e;
    }
    }
    
    export const setDataInLocalStorage = async (dataLabel, data) => {
    try {
    await AsyncStorage.setItem(dataLabel, data);
    } catch(e) {
    throw e;
    }
    }