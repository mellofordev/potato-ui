import React,{useRef,useState,useEffect,useContext} from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import { Appbar,Divider } from 'react-native-paper';
import ProfileCardComponent from '../ProfileCardComponent';
import PostComponent from '../PostComponent';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';
export default function Profile(){
    const {logout} =useContext(AuthContext);
    const {gettoken}=useContext(AuthContext);  
    console.log(gettoken());

    const modalizeRef = useRef(null);
    const onOpen=()=>{
        modalizeRef.current?.open()
    }

    return(
    <>    
    <View style={{flex:1,backgroundColor:'#FCFCFC'}}>
        <Appbar.Header style={{backgroundColor:'#fff'}}>
            <Appbar.Content title={'Your Profile'}/>
            <Appbar.Action icon='account-cog'  style={{right:1}} onPress={()=>{onOpen();}}/>
        </Appbar.Header>
        
    
        <PostComponent apiUrl='https://punfuel.pythonanywhere.com/api/userpost?limit=' 
          topheader={()=>{
           return(
            <View style={{flex:1}}>   
                <ProfileCardComponent  item={gettoken()}/>
           </View>
            );
           }}
           issticky={0.1}
           item={gettoken()} 
        />
    
    </View>
    <Modalize snapPoint={300} modalHeight={500} ref={modalizeRef}
    HeaderComponent={
        <View>
            <Text style={{fontSize:20,textAlign:'center',marginTop:3}}>additional settings</Text>
            <Divider/>
        </View>
    }>
        <View style={{flexDirection:'column'}}>
        <View style={{margin:8}}>
                <TouchableOpacity style={{marginLeft:5}} onPress={()=>logout()}>
                    <Text style={{fontSize:25,color:'grey'}}>logout</Text>
                </TouchableOpacity>
                
        </View>
        <View style={{margin:8}}>
                <TouchableOpacity style={{marginLeft:5}}>
                    <Text style={{fontSize:25,color:'grey'}}>verify account</Text>
                </TouchableOpacity>
                
        </View>
        <View style={{margin:8}}>
                <TouchableOpacity style={{marginLeft:5}}>
                    <Text style={{fontSize:25,color:'red'}}>delete account</Text>
                </TouchableOpacity>
                
        </View>
        
        </View>
    </Modalize>
    </>
    );
}
