import React,{useRef,useState,useEffect,useContext} from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import { Appbar,Divider } from 'react-native-paper';
import ProfileCardComponent from '../ProfileCardComponent';
import PostComponent from '../PostComponent';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';

export default function Profile(){
    const flatdata =[{id:'1',name:'logout'}]
    const [dynamicsnaps,setDynamicSnaps]=useState(500);
    const {logout} =useContext(AuthContext)
    var token='';
    const getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          token=value;
          console.log(token);
        } catch(e) {
          console.log(e);
        }
        
      }
    const renderComponent =({item})=>{
        
        return(
            <View style={{margin:8}}>
                <TouchableOpacity style={{marginLeft:5}} onPress={()=>logout()}>
                    <Text style={{fontSize:25,color:'grey'}}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const modalizeRef = useRef(null);
    const onOpen=()=>{
        modalizeRef.current?.open()
    } 
    useEffect(()=>{
        getToken();
        
    },[])
    return(
    <>    
    <View style={{flex:1}}>
        <Appbar.Header style={{backgroundColor:'#fff'}}>
            <Appbar.Content title={'Your Profile'}/>
            <Appbar.Action icon='account-cog'  style={{right:1}} onPress={()=>{setDynamicSnaps(300); onOpen();}}/>
        </Appbar.Header>
        
    
        <PostComponent apiUrl='https://punfuel.pythonanywhere.com/api/home?limit=' 
          topheader={()=>{
           return(
            <View style={{flex:1}}>   
                <ProfileCardComponent  item={token}/>
           </View>
            );
           }}
           issticky={0.1}
           item={token} 
        />
    
    </View>
    <Modalize snapPoint={300} modalHeight={500} ref={modalizeRef}
    HeaderComponent={
        <View>
            <Text style={{fontSize:20,textAlign:'center',marginTop:3}}>additional settings</Text>
            <Divider/>
        </View>
    } 
    flatListProps={{
        data:flatdata,
        renderItem:renderComponent,
        keyExtractor:(item) =>{item.id.toString()},
        showsVerticalScrollIndicator:false,

    }}
    />
    </>
    );
}
