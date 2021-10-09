import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet, Image, TouchableOpacity, Platform, Alert} from 'react-native';
import { Card,TextInput,Button,Title} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { FixedBottom } from './FixedBottomComponent';
import RButton from './RButtonComponent';
export default function EditProfile({route}){
    const [image,setImage]=useState('https://punfuel.pythonanywhere.com'+route.params.img);
    const apireq = ()=>{
        fetch('https://punfuel.pythonanywhere.com/accounts/api/update/profile/',{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Token '+route.params.t,
            }
            
        })
    }
    useEffect(()=>{
      (async()=>{
          if(Platform.OS!=='web'){
              const {status} =ImagePicker.requestMediaLibraryPermissionsAsync();
              if(status!='granted'){
                  Alert.alert('Allow..!','Allow the camera access to upload image.');

              }
          }
      })();
    },[]);
    const pickImage= async()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            quality:1
        });
        if(!result.cancelled){
            setImage(result.uri);
        }
    }
    return(
        <View style={styles.container}>
            
            <Card style={{justifyContent:'center',alignItems:'center'}}>
                
                <TouchableOpacity style={styles.editimage} onPress={()=>{pickImage()}}>
                    <Image source={{uri:image}}  resizeMode={'cover'} style={{height:'100%',width:'100%'}}/>
                </TouchableOpacity>
                
            </Card>
            <View style={{backgroundColor:'#ffff',height:'80%'}}>
            <TextInput label="set your bio" mode='flat' value={route.params.bio} style={{margin:5}} />
            <TextInput label="email" mode='flat' style={{margin:5}} />
            
            </View>
            <FixedBottom>
                <RButton title={'Update'}/>
            </FixedBottom>
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
        borderRadius:15,
       

    }
});