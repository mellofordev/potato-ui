import React,{useState,useContext} from 'react';
import { View,StyleSheet, Alert} from 'react-native';
import {Button as RButton,Title,TextInput,Card,Text}  from 'react-native-paper';
import {AuthContext} from '../AuthContext';

function Signup({navigation}){
    const {signup} =useContext(AuthContext);
    const [username,setUsername]=useState(null);
    const [email,setEmail]=useState(null);
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
    const apireq =()=>{
        setLoading(true);
        if(username==null || email==null || password==null){
            Alert.alert('username, email, password are required');
            setLoading(false);
        }else{
            setLoading(true);
            fetch('https://punfuel.pythonanywhere.com/accounts/api/signup/',{
                method:'POST',
                headers:{
    
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    username:username,
                    email:email,
                    password:password,
                    password2:password,
                })
            })
            .then(response=>response.json())
            .then(data=>{
                setLoading(false);
                if(data.token){
                    console.log(data.token);
                    signup(data.token);
                    
                }else if(data.error){
                    Alert.alert('Ops!',data.error);
                    setLoading(false);
                }else{
                    Alert.alert('Password!',data.password[0]);
                    setLoading(false);
                }
            })
            .catch(error=>{
                console.log(error);
                Alert.alert('Network error');
                setLoading(false);
            })
        }
    }

    return(
        <View style={styles.container}>
            <View>
            <Text style={{marginLeft:10,fontSize:35,marginTop:7,fontWeight:'bold'}}>Create your account.</Text>
            </View>
            <Card>
                
                <Card.Content>
                    <View>
                        <TextInput style={styles.input} label="username" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' value={username} onChangeText={username=>setUsername(username)} />
                        <TextInput style={styles.input} label="email" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' value={email} onChangeText={email=>setEmail(email)} />
                        <TextInput style={styles.input} label="password"  theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' value={password} onChangeText={password=>setPassword(password)} secureTextEntry={secureEntry} right={<TextInput.Icon name={secureEntry==true?'eye-off' : 'eye'} color={'grey'} onPress={()=>{toggleShowPassword()}}/>}/>
                        
                    </View>
                    <View>
                {loading==false ?
                        <RButton style={{marginBottom:25,height:50,borderRadius:55,marginTop:15,elevation:0}} mode='contained' color='#7289DA' onPress={()=>{apireq()}} >
                            <Title style={{color:'white',fontStyle:'normal',textTransform:'none'}}>Signup</Title>
                        </RButton>
                        
                         :(
                        <RButton style={{marginBottom:25,height:50,borderRadius:55,marginTop:15,elevation:0}} mode='contained' color='#7289DA' disabled={true}>
                            <Title style={{color:'white',fontStyle:'normal',textTransform:'none'}}>Loading...</Title>
                        </RButton>
                        )
                }        
                </View>
                </Card.Content>
            </Card>
            
            
            
        </View>
    );
}

const styles =StyleSheet.create({
    container:{
        
        flexDirection:'column',
        backgroundColor:'#fff',
        height:'100%',
        justifyContent:'flex-start',

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

export default Signup;
