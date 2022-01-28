import React from "react";
import {View,StyleSheet} from 'react-native';
import { ActivityIndicator } from "react-native-paper";
import {WebView} from 'react-native-webview';
import { blueshade } from "../defaultValues";
export default function ForgotPassword(){
    const [loading,setLoading]=React.useState(false);
    return(
        <View style={styles.container}>
            {loading==false &&
              <ActivityIndicator style={{marginTop:50}} size={24} color={blueshade} />
              
            }
             <WebView onLoad={()=>{setLoading(true)}} source={{uri:'https://punfuel.pythonanywhere.com/accounts/reset_password/'}}/>
            
        </View>
    );
}

const styles =StyleSheet.create({
    container:{
        flexDirection:'column',
        backgroundColor:'white',
        flex:1
    }

});