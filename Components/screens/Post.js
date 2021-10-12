import React, { useState,useEffect, useContext } from 'react';
import {View,Text,TextInput,Image,StyleSheet,Dimensions, TouchableOpacity,Platform,Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import RButton from '../RButtonComponent';
import * as ImagePicker from 'expo-image-picker';
import {Divider} from 'react-native-paper';
import { AuthContext } from '../AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
const width=Dimensions.get("window").width;
export default function Post(){
    const [image,setImage]=useState(null);
    const [text,setText]=useState(null);
    const [isdisabled,setIsDisabled]=useState(true);
    const {gettoken} =useContext(AuthContext);
    const token =gettoken();
    useEffect(()=>{
        (async()=>{
            if(Platform.OS!=='web'){
                const {status} =ImagePicker.requestCameraPermissionsAsync();
                const {grn}=ImagePicker.getMediaLibraryPermissionsAsync();
                if(status!='granted'){
                    Alert.alert('Allow Permission','Allow the camera access to upload image.');
  
                }
            }
        })();
      },[]);
    useEffect(()=>{
        if(text=='' || text==null){
            setIsDisabled(true);
        }else{
            setIsDisabled(false);
        }
    })  
      const pickCamera= async()=>{
          let result=await ImagePicker.launchCameraAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              quality:1
          });
       
          if(!result.cancelled){
              setImage(result.uri);
          }
      }
      const pickImage= async()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            quality:1
        });
     
        if(!result.cancelled){
            setImage(result.uri);
            console.log(result.uri.split('/').pop())
        }
    }
    
      const apirequest =()=>{
          var imgname=image.split('/').pop();
          fetch('https://punfuel.pythonanywhere.com/newpost/',{
              method:'POST',
              headers:{
                  'Content-Type':'multipart/form-data',
                  'Authorization':'Token '+token,

              },
              body:JSON.stringify({
                  post:text,
                  pic:imgname,
              })
          })
          .then(response=>response.json())
          .then(data=>{
              Alert.alert('Posted successfully!');
              setImage(null);
              setText('');
              console.log(data);
          })
          .catch(error=>{
              Alert.alert('Network Error');
              console.log(error);
              
          })
      }

     
    return(
        <View style={styles.container}>
           <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginBottom:5}}>
               
                <Image source={{uri:'https://punfuel.pythonanywhere.com/media/default.png/'}} style={styles.userimg}/>
                <TextInput multiline={true} numberOfLines={3} placeholder={'place to write...'} value={text} onChangeText={(text)=>setText(text)} style={styles.input}/>
                  
           </View> 
           
           <View style={{flexDirection:'row'}}>
               <TouchableOpacity style={{marginLeft:15,marginTop:5,backgroundColor:'#FCFCFC',borderRadius:10}} onPress={()=>{pickImage()}}>
                    <Feather name="image" size={44} color="grey" />
                    
               </TouchableOpacity>
               <Text style={{textAlign:'center',color:'grey',marginTop:15}}>{image==null ?'Add image' :('add new image')}</Text>
               <TouchableOpacity style={{marginLeft:15,marginTop:5,backgroundColor:'#FCFCFC',borderRadius:10}} onPress={()=>{pickCamera()}}>
                    <MaterialIcons name="add-a-photo" size={44} color="grey" />
               </TouchableOpacity>
               <Text style={{textAlign:'center',color:'grey',marginTop:15}}>camera</Text>
           </View>
           <View style={{margin:5}}>
            {isdisabled==true ? <RButton title={'POST'} _is_disabled={true}/>
            :(
           <RButton title={'POST'}  _onpress={()=>{apirequest()}}/>
             ) }
           </View>
           <Divider/>
              <View style={{margin:5}}>
               <Image source={{uri:image}} style={{justifyContent:'center',alignItems:'center',height:'75%',borderRadius:9,resizeMode:'contain'}}/>
           
              
              </View>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        flexDirection:'column',
        flex:1,
        
    },
    userimg:{
        borderRadius:15,
        height:36,
        width:36,
        marginLeft:15,
        marginTop:15
    },
    input:{
        marginTop:45,
        marginRight:25,
        width:(width*3)/4,
        borderColor:'grey',
        borderWidth:1,
        borderRadius:10,

    }

});