
import React,{useState,useContext}  from 'react';
import {View,StyleSheet, Alert} from 'react-native';
import {Button as RButton,Title,TextInput,Card}  from 'react-native-paper';

import { AuthContext } from '../AuthContext';

function Login({navigation}){
    const {login} =useContext(AuthContext);
    const [username,setUsername]=useState(null);
    const [password,setPassword]=useState(null);
    const [loading,setLoading]=useState(false);
    const [secureEntry,setSecureEntry]=useState(true);
    const toggleShowPassword =()=>{
        if(secureEntry==false){
            setSecureEntry(true);
        }else{
            setSecureEntry(false);
        }
    }
    const apirequest =()=>{
        if(username==null || password==null){
            Alert.alert('Username and password is required');
            setLoading(false);
        }else{
            setLoading(true);
            fetch('https://punfuel.pythonanywhere.com/accounts/api/login/',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username:username,
                    password:password,
                })
            })
            .then((response)=>response.json())
            .then(token=>{
                setLoading(false);
                if(token.token){
                    login(token.token);
                }else{
                    
                    Alert.alert('Unable to login with provided credentials','Check your username and password');
                }
                
                
            })
            .catch(error=>{
                Alert.alert('Network Error');
                setLoading(false);
            })
            
        }
    }

    return (
        <View style={styles.container}>
            <Card>
                <Card.Cover source={{ uri: 'https://i.ibb.co/n0wm6Pt/come-join.png' }}/>
                <Card.Content>
                    <View >
                        <TextInput style={styles.input} label="username" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' value={username} onChangeText={username=>setUsername(username)} />
                        <TextInput style={styles.input} label="password" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' value={password} onChangeText={password=>setPassword(password)} secureTextEntry={secureEntry} right={<TextInput.Icon name={secureEntry==true?'eye-off' : 'eye'} color={'grey'} onPress={()=>{toggleShowPassword()}}/>}/>
                        {loading==false?
                        <RButton style={{marginBottom:25,height:50,borderRadius:55,marginTop:15,elevation:0}} mode='contained' color='#7289DA' disabled={false}  onPress={()=>{apirequest()}}>
                            <Title style={{color:'white',fontStyle:'normal',textTransform:'none'}}>Login</Title>
                        </RButton>:(
                        <RButton style={{marginBottom:25,height:50,borderRadius:55,marginTop:15,elevation:0}} mode='contained' color='#7289DA' disabled={true}>
                           <Title style={{color:'white',fontStyle:'normal',textTransform:'none'}}>
                               Loading...
                           </Title>
                        </RButton>
                        )}
                    </View>
                </Card.Content>
            </Card>
            <View style={styles.footer}>
                <RButton mode='outlined'  color='#23272A' style={{marginRight:6,borderRadius:12}} >Forgot password?</RButton>
                <RButton mode='outlined' color='#23272A' style={{marginRight:6,borderRadius:12}} onPress={()=>navigation.navigate('Signup')}>Join now</RButton>
            </View>            
            
        </View>

    );
}
const styles =StyleSheet.create({
    container:{
        
        flexDirection:'column',
        justifyContent:'center',


    },
    input:{
        marginTop:15,
       

    },
    footer:{
        marginTop:25,
        flexDirection:'row',
        justifyContent:'center',
        

    },

});
export default Login;

