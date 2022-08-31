import React, { useState,useEffect, useContext, useRef } from 'react';
import {View,Text,TextInput,Image,StyleSheet,Dimensions, TouchableOpacity,Platform,Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import RButton from '../RButtonComponent';
import * as ImagePicker from 'expo-image-picker';
import {Divider} from 'react-native-paper';
import { AuthContext } from '../AuthContext';
import { MaterialIcons } from '@expo/vector-icons';
import { blackshade, whitegreyshade } from '../defaultValues';
import { Video } from 'expo-av';
const width=Dimensions.get("window").width;
export default function Post(){
    const [image,setImage]=useState(null);
    const [text,setText]=useState(null);
    const [isdisabled,setIsDisabled]=useState(true);
    const [loading,setLoading]=useState(false);
    const {gettoken} =useContext(AuthContext);
    const token =gettoken();
    const video =useRef(null);
    
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
              mediaTypes:ImagePicker.MediaTypeOptions.All,
              allowsEditing:true,
              quality:1
          });
       
          if(!result.cancelled){
              setImage(result.uri);
          }
      }
      const pickImage= async()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.All,
            allowsEditing:true,
            quality:1,
            videoQuality:1,
            videoMaxDuration:1000
        });
     
        if(!result.cancelled){
            setImage(result.uri);
            
            
        }
    }
    
      const apirequest =()=>{
          setLoading(true);
          var formdata = new FormData();
          formdata.append('post',text);
    
          if(image!=null){
          var imgname=image.split('/').pop();
          var imgType=imgname.split('.').pop();
          console.log(imgType);
          formdata.append('pic',{
            uri:image,
            name:imgname,
            type:(imgType!='mp4'?'image/'+imgType:'video/'+imgType),
          });
          imgType=='mp4'?formdata.append('video',true):formdata.append('video',false)
          }else{
              formdata.append('pic','');
          }
  

          fetch('https://punfuel.pythonanywhere.com/newpost/',{
              method:'POST',
              headers:{
                  'Content-Type':'multipart/form-data',
                  'Authorization':'Token '+token,

              },
              body:formdata
          })
          .then(response=>response.json())
          .then(data=>{
              Alert.alert('Posted successfully!');
              setLoading(false);
              setImage(null);
              setText('');
              
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
                <TextInput multiline={true} numberOfLines={3} placeholder={' Add a Title'} value={text} onChangeText={(text)=>setText(text)} style={styles.input}/>
                  
           </View> 
           
           <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
               <TouchableOpacity style={{marginLeft:15,marginTop:5,backgroundColor:whitegreyshade,borderRadius:10}} onPress={()=>{pickImage()}}>
                    <Feather name="image" size={44} color={blackshade} />
                    
               </TouchableOpacity>
               <Text style={{textAlign:'center',color:blackshade,marginTop:15}}>{image==null ?'Add image' :('add new image')}</Text>
               <TouchableOpacity style={{marginLeft:15,marginTop:5,backgroundColor:whitegreyshade,borderRadius:10}} onPress={()=>{pickCamera()}}>
                    <MaterialIcons name="add-a-photo" size={44} color={blackshade} />
               </TouchableOpacity>
               <Text style={{textAlign:'center',color:blackshade,marginTop:15}}>camera</Text>
           </View>
           <View style={{margin:5}}>
            {isdisabled==true ? <RButton title={'POST'} _is_disabled={true}/>
            :[
              loading==false ?  
           <RButton title={'POST'}  _onpress={()=>{apirequest()}}/>
            :(<RButton title={'Posting...'} />)
             ] }
           </View>
           <Divider/>
              <View style={{margin:5}}>
                {
                  
                  image!=null && 
                  (image.split('.').pop()=='mp4'?(
                    <Video
                    source={{uri:image}}
                    useNativeControls
                    isLooping
                    style={{justifyContent:'center',alignItems:'center',height:'75%',borderRadius:9,backgroundColor:'black'}}
                    resizeMode='contain'
                    ref={video}
                    />
                  ):<Image source={{uri:image}} style={{justifyContent:'center',alignItems:'center',height:'75%',borderRadius:9,resizeMode:'contain'}}/>
                )
                }
               
           
              
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