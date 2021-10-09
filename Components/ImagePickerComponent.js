import  { useEffect, useState } from 'react';
import {Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerComponent(){
    const [image,setImage]=useState(null);
    useEffect(()=>{
        (async()=>{
            if(Platform.OS!=='web'){
                const {status} =ImagePicker.requestMediaLibraryPermissionsAsync();
                const {cameraStatus} =ImagePicker.getCameraPermissionsAsync();
                if(status!='granted' || cameraStatus!='granted'){
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
      const openedCamera = async()=>{
          let results =await ImagePicker.launchCameraAsync({
              mediaTypes:ImagePicker.MediaTypeOptions.Images,
              allowsEditing:true,
              quality:1,
          });
      }
      
    const showimg =()=>{
        return image;
    }
}
