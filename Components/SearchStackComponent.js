import React,{useState,useEffect,useContext} from 'react';
import {View,Text,StyleSheet,FlatList,Image,ActivityIndicator} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Appbar,Card,Searchbar } from 'react-native-paper';
import { AuthContext } from './AuthContext';

import SearchListComponent from './SearchListComponent';
export default function SearchStackComponent({navigation}){
    const [Data,setData] =useState([]);
    const [loading,setLoading]=useState(true);
    const [userinput,setUserInput] =useState();
    const {gettoken} =useContext(AuthContext);
    const apireq =()=>{
        fetch(`https://punfuel.pythonanywhere.com/api/search?search=${userinput}`,{
            method:'GET',
            headers:{
                'Authorization':'Token '+gettoken(),
                'Content-Type':'application/json'

            }
        })
        .then(response=>response.json())
        .then(data=>{
            setData(data);
            setLoading(false);
            
        })
        .catch(e=>{
            console.log(e);
        })
    }
    useEffect(()=>{
        if(userinput!=''){
            apireq();
        }
    },[userinput])
    return(
        <View>
           <Appbar.Header style={{backgroundColor:'#fff',elevation:0}}>
               
               <Appbar.Content title={<Searchbar onChangeText={(userinput)=>setUserInput(userinput)} value={userinput} placeholder='Search memers' style={{marginBottom:3,borderRadius:10,width:300}} />}/>
              <Appbar.Action icon={'close'} onPress={()=>{navigation.goBack();}}/>
           </Appbar.Header>
           <SearchListComponent props={Data} loading={loading} token={gettoken()}/>
        </View>
    );
}

const styles =StyleSheet.create({
    profilecard:{
        flexDirection:'row',
        margin:10
    },
    profilepic:{
        height:50,
        width:50,
        borderRadius:55
    },
    profiletext:{
        fontSize:25,
        fontWeight:'900',
        fontFamily:'Roboto',
        marginLeft:15

    }
})