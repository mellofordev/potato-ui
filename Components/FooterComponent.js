import React,{useState,useEffect, useCallback} from 'react';
import {View,Image,Text,ActivityIndicator} from 'react-native';


export default function FooterComponent({item}){
    return(
    
        <View style={{height:350,marginTop:10,margin:5,backgroundColor:'#fff',borderRadius:15,elevation:3}}>
            {item!=[] ?
                 <Text style={{fontSize:35,margin:15,fontWeight:'bold'}}>That's all folks</Text>   
             :(
                <View style={{margin:5}}>
                </View>
             )}   
        </View>
    );
}