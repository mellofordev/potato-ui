import React from 'react';
import {View} from 'react-native';

export const FixedBottom =({children})=>{
    return(
    <View style={{position:'absolute',bottom:10,right:0,left:0,marginBottom:16,margin:5}}>
        {children}
    </View>);
}
