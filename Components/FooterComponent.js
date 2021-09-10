import React from 'react';
import {View,Image} from 'react-native';

export default function FooterComponent(){
    return(
        <View style={{height:350,margin:10,marginTop:10,backgroundColor:'#fff',borderRadius:15,}}>
             <Image style={{borderRadius:15,height:'45%',width:'100%'}} source={{uri:'https://cinemagixblog.files.wordpress.com/2013/02/thatsallfolks.jpg'}}/>
            
        </View>
    );
}