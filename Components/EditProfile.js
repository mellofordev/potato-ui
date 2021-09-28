import React from 'react';
import {View,Text,StyleSheet, Image, TouchableOpacity} from 'react-native';
import { Card,TextInput,Button,Title} from 'react-native-paper';

export default function EditProfile(){
    const apireq = ()=>{
        fetch('https://punfuel.pythonanywhere.com/accounts')
    }
    return(
        <View style={styles.container}>
            
            <Card style={{justifyContent:'center',alignItems:'center'}}>
                
                <TouchableOpacity style={styles.editimage}>
                    <Image source={{uri:'https://punfuel.pythonanywhere.com/media/default.png/'}}  resizeMode={'cover'} style={{height:'100%',width:'100%'}}/>
                </TouchableOpacity>
                
            </Card>
            <View style={{backgroundColor:'#ffff',height:'80%'}}>
            <TextInput label="set your bio" mode='flat' style={{margin:5}} />
            <TextInput label="email" mode='flat' style={{margin:5}} />
            <View style={{bottom:0,margin:5}}>
            <Button style={{height:50,borderRadius:15,marginTop:15,elevation:1}} mode='contained' color='#7289DA' disabled={false} >
                <Title style={{color:'white',fontStyle:'normal',textTransform:'none'}}>Update</Title>
            </Button>
            </View>
            </View>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,

    },
    editimage:{
        marginTop:12,
        marginBottom:10,
        height:80,
        width:80,
        backgroundColor:'grey',
        borderRadius:15,
        borderColor:'#bbbbbb',
        borderWidth:1,

    }
});