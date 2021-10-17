import React,{useState} from 'react';
import {View,StyleSheet,Image,Text,TouchableOpacity, Alert,Dimensions} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as RootNavigation from './RootNavigation';
export default function PostCard({item,onOpen,token}){
   
    var uid=item.id;
    var user=item.user;
    const [like,setLike]=useState(item.liked);
    const [like_count,setLikeCount]=useState(item.like_count);
    
    const onLike =()=>{
        if(like==false){
            setLike(true);
            setLikeCount(like_count+1);
            fetch('https://punfuel.pythonanywhere.com/api/like/'+item.id+'/',{
                method:'GET',
                headers:{
                    'Content-Types':'application/json',
                    'Authorization':'Token '+token,
                }
            })
            .then(response=>response.json())
            .catch(error=>{
                Alert.alert('Something unexpected happened!');
            })

        }else{
            setLikeCount(like_count-1);
            setLike(false);
            fetch('https://punfuel.pythonanywhere.com/api/unlike/'+item.id+'/',{
                method:'Delete',
                headers:{
                    'Content-Types':'application/json',
                    'Authorization':'Token '+token,
                }
            })
            .then(response=>response.json())
            .catch(error=>{
                Alert.alert('Something unexpected happened!');
            })
        }
    }
    return(

    <View style={styles.container}>
           
    <View style={styles.postContainer}>
        <View style={{margin:5}}>
            <View style={styles.postHeader}>
                <TouchableOpacity onPress={()=>RootNavigation.navigate('StackProfile',{username:item.user,t:token})}>
                <Image source={{uri:'https://punfuel.pythonanywhere.com'+item.user_profile_pic}} style={{borderRadius:15,height:55,width:55,borderColor:'#fffaf0',borderWidth:1}}  />
                </TouchableOpacity>
                <View style={styles.postNameContainer}>
                    <Text style={{fontSize:19,marginLeft:15}}>@{item.user}</Text>
                    { item.verified==true &&
                        <Image style={{width:16,height:16,marginTop:6,marginLeft:3}} source={{uri:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_verified.png'}}/>  
                    }
                </View>
                
            </View>
            <View style={styles.postContent}>
                <Text style={{fontSize:19}}>{item.post}</Text>
                { item.pic!=null &&
                    <Image source={{uri:item.pic}}  style={{resizeMode:'contain',width:'100%',height:undefined,aspectRatio:1}}/>
                }
                <View style={styles.postIcons}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{onLike();}}>
                        {
                        like==false?    
                        <Ionicons name="heart-outline" size={26} color="#2C2F33" />
                        :(<Ionicons name="heart-sharp" size={26} color="#7289DA" />)
                        }
                        </TouchableOpacity>
                        <Text style={{color:'#7289DA',marginTop:3}}>{like_count}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{RootNavigation.navigate('StackComment',{id:uid,t:token})}}>
                        <EvilIcons name="comment" size={34} color="#2C2F33" />
                        </TouchableOpacity>
                        <Text style={{color:'grey',marginTop:3}}>{item.comment_count}</Text>
                        
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{onOpen()}}>
                        <EvilIcons name="share-apple" size={34} color="#2C2F33" />
                        </TouchableOpacity>
                        <Text style={{color:'grey',marginTop:3}}>1k</Text>
                    </View>
                </View>
            </View>
        </View>
    </View>
    </View>

    );
}

const styles=StyleSheet.create({
    container:{
        marginTop:10,
        flexDirection:'column',
        justifyContent:'center',
        margin:3,
        elevation:1

        

    },
    postContainer:{
        
        margin:0,
        
        flexDirection:'column',
        backgroundColor:'white',
        borderRadius:10,
        elevation:0.5
        
        

    },
    postHeader:{
        flexDirection:'row',
        marginLeft:4,
        marginTop:5,
        marginBottom:3,
    },
    postNameContainer:{
        flexDirection:'row',
        marginTop:13,       
    },
    postContent:{
        marginTop:2,
        flexDirection:'column',
        marginHorizontal:3,
        marginLeft:4,

        
    },
    postIcons:{
        marginTop:4,
        marginLeft:5,
        flexDirection:'row',
        justifyContent:'space-between',

    },


    
});