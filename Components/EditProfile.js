import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet, Image, TouchableOpacity, Platform, Alert,TextInput} from 'react-native';
import { Card} from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { FixedBottom } from './FixedBottomComponent';
import RButton from './RButtonComponent';
import { blackshade } from './defaultValues';
export default function EditProfile({route,navigation}){
    const imgVal=`https://punfuel.pythonanywhere.com${route.params.img}`;
    const [image,setImage]=useState(imgVal);
    const [text,setText]=useState(route.params.bio);
    const [isDisabled,setIsDisabled]=useState(true);
    const [loading,setLoading]=useState(false);
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
      useEffect(()=>{
          if(text==route.params.bio || image==imgVal){
              setIsDisabled(true);
          } 
          if(text!=route.params.bio || image!=imgVal){
              setIsDisabled(false);
          }
      })  
    const apireq = ()=>{
        setLoading(true);
        var formData = new FormData();
        
        if(text!=route.params.bio){
            formData.append('bio',text);
        }
        if(image!=imgVal){
            console.log('pic activated');
            var imgname=image.split('/').pop();
            var imgType=imgname.split('.').pop();
            formData.append('pic',{
                
                    uri:image,
                    name:imgname,
                    type:'image/'+imgType,
            
            })
            
            }
        
        fetch('https://punfuel.pythonanywhere.com/accounts/api/update/profile/',{
            method:'POST',
            headers:{
                'Content-Type':'multipart/form-data',
                'Authorization':'Token '+route.params.t,
            },
            
            body:formData,
            
        })
        .then(response=>response.json())
        .then(data=>{
            
            setLoading(false);
            setImage(null);
            setText(null);
            
            Alert.alert('Updated','Successfully updated your profile');
            navigation.goBack();
            
            
        })
        .catch(error=>{
            Alert.alert('Ops !');
            console.log(error);
            setLoading(false);
        })
    ;
    }

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
            <TextInput multiline={true} numberOfLines={3}  value={text} onChangeText={(text)=>setText(text)} style={styles.input}/>
            <TextInput label="email" mode='flat' style={{margin:5}} />
            
            </View>
            <FixedBottom>
                {isDisabled==true ? <RButton title={'Update'} _is_disabled={true}/>
                :[
                loading==false ?  
            <RButton title={'Update'}  _onpress={()=>{apireq()}}/>
                :(<RButton title={'Updating...'} />)
                ] }
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
        borderRadius:10,
       

    },
    input:{
        marginTop:45,
        marginRight:45,
        width:'100%',
        borderColor:blackshade,
        borderWidth:1,
        borderRadius:10,
        

    }
});