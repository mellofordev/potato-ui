import React from 'react';
import {View,Image,Text,Dimensions,StatusBar} from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';

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
            <View style={{flexDirection:'column'}} >
                <Text style={{fontSize:12,color:'white',textAlign:'left'}}>posted by potato</Text>
                <Text style={{marginLeft:5,color:'grey',textAlign:'left'}}>date</Text>
            </View>
        </View>
        
        </>
    );
}