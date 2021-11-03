import React from 'react';
import {View,Image,Dimensions} from 'react-native';

export default function ImageViewer({navigation,route}){
    const width =Dimensions.get("screen").width;
    const height=Dimensions.get("screen").height;
    const closeViewer =()=>{
        navigation.goBack(null);
    }
    return(
        <>
        <View style={{height:'100%',backgroundColor:'black',flexDirection:'column',flex:1}}>
            
            <Image source={{uri:route.params.img}} style={{height:height,width:width,resizeMode:'center'}} />
            
        </View>
        
        </>
    );
}