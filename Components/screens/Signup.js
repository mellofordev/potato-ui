import React from 'react';
import { View,StyleSheet} from 'react-native';
import {Button as RButton,Title,TextInput,Card}  from 'react-native-paper';

function Signup({navigation}){
    const [username,setUsername]=React.useState('');
    const [email,setEmail]=React.useState('');
    const [password,setPassword]=React.useState('');
    const [change,setChange]=React.useState(false);
    return(
        <View style={styles.container}>
            <Card>
                <Card.Cover source={{ uri: 'https://public-files.gumroad.com/variants/cfv3par6ajy1tk00pswige6wrfi5/baaca0eb0e33dc4f9d45910b8c86623f0144cea0fe0c2093c546d17d535752eb' }}/>
                <Card.Content>
                    <View >
                        <TextInput style={styles.input} label="username" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' />
                        <TextInput style={styles.input} label="email" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' />
                        <TextInput style={styles.input} label="password"  theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' secureTextEntry={true} />
                        <TextInput style={styles.input} label="confim password" theme={{colors:{primary:'#7289DA',text:'#23272A'}}} mode='flat' secureTextEntry={true} />
                        <RButton style={{marginBottom:25,height:50,borderRadius:55,marginTop:15,elevation:0}} mode='contained' color='#7289DA' >
                            <Title style={{color:'white',fontStyle:'normal',textTransform:'none'}}>Signup</Title>
                        </RButton>
                    </View>
                </Card.Content>
            </Card>
           
            
        </View>
    );
}

const styles =StyleSheet.create({
    container:{
        
        flexDirection:'column',
        justifyContent: 'center',
        
        

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
