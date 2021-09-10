
import React  from 'react';
import {View,StyleSheet} from 'react-native';
import {Button as RButton,Title,TextInput,Card}  from 'react-native-paper';
function Login({navigation}){

    return (
        <View style={styles.container}>
            <Card>
                <Card.Cover source={{ uri: 'https://i.redd.it/y1ostvqnr4711.jpg' }}/>
                <Card.Content>
                    <View >
                        <TextInput style={styles.input} label="username" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' />
                        <TextInput style={styles.input} label="password" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat'  secureTextEntry={true}/>
                        <RButton style={{marginBottom:25,height:50,borderRadius:55,marginTop:15,elevation:0}} mode='contained' color='#7289DA'>
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

