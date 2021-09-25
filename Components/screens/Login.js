
import React,{useState,useContext}  from 'react';
import {View,StyleSheet, Alert} from 'react-native';
import {Button as RButton,Title,TextInput,Card}  from 'react-native-paper';
import { AuthContext } from '../AuthContext';
import * as SecureStore from 'expo-secure-store';

async function save(key,value){
    await SecureStore.setItemAsync(key,value);
}
function Login({navigation}){
    const {login} =useContext(AuthContext);
    const [username,setUsername]=useState(null);
    const [password,setPassword]=useState(null);
    const [tokens,setToken]=useState('');
    const [loading,setLoading]=useState(false);
    const apirequest =()=>{
        if(username==null || password==null){
            Alert.alert('Username and password is required');
        }else if(username&&password==null){
            Alert.alert("Are you dumb ?",
            "username and password are required");
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
                console.log(token.token);
                setToken(token.token);
                save('username',tokens);
                login(username);
                setLoading(false);
            })
            .catch(error=>{
                Alert.alert(error);
            })
            
        }
    }
    if(loading==true){
        Alert.alert("Heads up!",
        "Hang on ,we are verifying your authenticity");
    }
    return (
        <View style={styles.container}>
            <Card>
                <Card.Cover source={{ uri: 'https://media-cldnry.s-nbcnews.com/image/upload/t_social_share_1024x768_scale,f_auto,q_auto:best/newscms/2021_17/3469025/210429-memes-nft-gold-rush-2-se-101p.jpg' }}/>
                <Card.Content>
                    <View >
                        <TextInput style={styles.input} label="username" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' value={username} onChangeText={username=>setUsername(username)} />
                        <TextInput style={styles.input} label="password" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' value={password} onChangeText={password=>setPassword(password)} secureTextEntry={true}/>
                        <RButton style={{marginBottom:25,height:50,borderRadius:55,marginTop:15,elevation:0}} mode='contained' color='#7289DA' disabled={false}  onPress={()=>{apirequest()}}>
                            <Title style={{color:'white',fontStyle:'normal',textTransform:'none'}}>Login</Title>
                        </RButton>
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

