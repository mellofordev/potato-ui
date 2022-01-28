import React from "react";
import {View,Text,StyleSheet, Pressable} from 'react-native';
import { Title,TextInput,Button as RButton } from "react-native-paper";
export default function ForgotPassword(){
    const [send,setSend]=React.useState(false);
    const [email,setEmail]=React.useState('');
    const [msg,setMsg]=React.useState({main:false,label:'Enter your email linked with your account'});
    const _handleMsg=()=>{
        setMsg({main:true,label:'We have send you an email with password reset link!'})
    }
    return(
        <View style={styles.container}>
            <View style={{margin:15}}>
                <Title style={{fontSize:25,fontWeight:'600'}}>{msg.label}</Title>
                {msg.main==false &&
                  <View>
                      <TextInput style={{marginTop:15}}  label="email" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' value={email} onChangeText={email=>setEmail(email)} />
                  <RButton style={{marginBottom:25,height:50,borderRadius:55,marginTop:15,elevation:0}} mode='contained' color='#7289DA' disabled={false}  onPress={()=>{_handleMsg()}}>
                    <Title style={{color:'white',fontStyle:'normal',textTransform:'none'}}>Send</Title>
               </RButton>
                  </View>    
                }
               
                
            </View>
            
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