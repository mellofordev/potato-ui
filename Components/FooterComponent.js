import React from 'react';
import {View,Image,Text} from 'react-native';
export default function FooterComponent({item}){
    
    return(
    
        <View style={{height:350,marginTop:10,margin:5,backgroundColor:'#fff',borderRadius:15,elevation:3}}>
            {item!=[] ?
            (    <Image style={{borderRadius:15,height:'45%',width:'100%'}} source={{uri:'https://cinemagixblog.files.wordpress.com/2013/02/thatsallfolks.jpg'}}/> 
                 
                 )
             :(
                <View style={{margin:5}}>
                </View>
             )}   
        </View>
    );
}