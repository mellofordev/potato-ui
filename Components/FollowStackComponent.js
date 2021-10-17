import React, { useEffect } from 'react';
import { useState } from 'react';
import {View,Text,StyleSheet,Image,TouchableOpacity,ActivityIndicator} from 'react-native';
import {Appbar} from 'react-native-paper';

export default function FollowStackComponent({navigation,route}){
    const [followData,setFollowData]=useState([]);
    const [loading,setLoading]=useState(true);
    const followersApiReq=()=>{
        
        fetch(`https://punfuel.pythonanywhere.com/api/${route.params.type}/${route.params.username}/`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Token '+route.params.token
            }
        })
        .then(response=>response.json())
        .then(data=>{
            setFollowData(data.followers);
            setLoading(false);
        })
        .catch(error=>{Alert.alert('Something unexpected happened!');})
    }
    useEffect(()=>{
        followersApiReq();
    },[]);
    return(
        <View style={{backgroundColor:'#ffff',height:'100%'}}>
        <Appbar.Header style={{backgroundColor:'#fff'}}>
            <Appbar.BackAction  onPress={()=>{navigation.goBack(null)}}/>
            <Appbar.Content title={route.params.type}/>
        </Appbar.Header>    
        <View style={styles.container}>
            <View>
                
                {loading==true ?<ActivityIndicator color={'blue'} size={44}/>
                :[
                    followData.length==0 && <Text style={{textAlign:'center',fontSize:20,fontWeight:'900',color:'grey'}}>No {route.params.type} to show</Text>
                ]
                }
                
            </View>
            {
            followData.map((id)=>{
                return(
                <View style={{flexDirection:'column',marginTop:5}}>
                    <TouchableOpacity style={{flexDirection:'row',marginLeft:10}} onPress={()=>{navigation.push('StackProfile',{username:id.user,t:route.params.token})}}>
                        <Image source={{uri:'https://punfuel.pythonanywhere.com'+id.user_profile_pic}} style={{height:55,width:55,borderRadius:10,borderColor:'#fffaf0',borderWidth:1}}/>
                        <View style={{flexDirection:'row',marginTop:5,marginBottom:2}}>
                        <Text style={{marginLeft:5,fontSize:20}}>{id.user}</Text>
                        {id.verified==true &&  <Image style={{width:16,height:16,marginTop:9,marginLeft:3}} source={{uri:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_verified.png'}}/>}
                        </View>
                    </TouchableOpacity> 
                    
                </View> );
            })

            }
        </View>
        </View>
    );
}

const styles =StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'center',

    }
});
 