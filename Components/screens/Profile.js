import React,{useRef,useContext,useState, useEffect} from 'react';
import {View,TouchableOpacity,Text, Alert,ScrollView} from 'react-native';
import { Appbar,Divider } from 'react-native-paper';
import ProfileCardComponent from '../ProfileCardComponent';
import PostComponent from '../PostComponent';
import { Modalize } from 'react-native-modalize';
import { AuthContext } from '../AuthContext';
import { whitegreyshade } from '../defaultValues';
export default function Profile(){
    const {logout} =useContext(AuthContext);
    const {gettoken}=useContext(AuthContext);  

    const modalizeRef = useRef(null);
    const onOpen=()=>{
        modalizeRef.current?.open()
    }
    const readyLogout=()=>{
        Alert.alert('Do you want to logout?','This will erase your account info from cache',[
          {text:'cancel'},
          {text:'logout',onPress:()=>logout()}

        ],{cancelable:true});
    }
    useEffect(()=>{
    const abortControl = new AbortController();
      return ()=>{
        
        abortControl.abort();
      };
    },[])
    return(
    <>    
    <View style={{flex:1,backgroundColor:whitegreyshade}}>
        <Appbar.Header style={{backgroundColor:'#fff',elevation:0}}>
            <Appbar.Content title={'Your Profile'}/>
            <Appbar.Action icon='account-cog'  style={{right:1}} onPress={()=>{onOpen()}}/>
        </Appbar.Header>
        <Divider/>
        <ScrollView>
  
        <PostComponent apiUrl={'https://punfuel.pythonanywhere.com/api/userpost/?limit=10'} 
        
           
           item={gettoken()} 
           onOpen={onOpen}
           topheader={()=>{
               return(
            <View style={{flex:1}}>   
                <ProfileCardComponent  item={gettoken()}
                

                />
           </View>  
               );
           }}
        />
        </ScrollView>
    
    </View>
    <Modalize snapPoint={300} modalHeight={500} ref={modalizeRef}
    HeaderComponent={
        <View>
            <Text style={{fontSize:20,textAlign:'center',marginTop:3}}>settings</Text>
            <Divider/>
        </View>
    }>

        <View style={{flexDirection:'column'}}>
        <View style={{margin:8}}>
                <TouchableOpacity style={{marginLeft:5}} onPress={()=>readyLogout()}>
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
