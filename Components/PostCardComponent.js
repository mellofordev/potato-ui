import React,{useState} from 'react';
import {View,StyleSheet,Image,Text,TouchableOpacity, Alert,Dimensions,Linking} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import { Ionicons,Octicons } from '@expo/vector-icons';
import * as RootNavigation from './RootNavigation';
import ParsedText from 'react-native-parsed-text';
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
    const Usernamepress=(name,matchIndex)=>{
        let nameAfterSlice=name.slice(1);
        
        RootNavigation.push('StackProfile',{username:nameAfterSlice,t:token});
    }
    const renderText =(matchingString, matches)=> {
        
        let pattern = /@(?=.{3,20}(?:\s|$))[a-z][a-z0-9]+(?:[._][a-z0-9]+)?/ig;
        
        let match = matchingString.match(pattern);
        
        return match[0];
    }
    const Urlpress=(url,matchIndex)=>{
        Linking.openURL(url);
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
                        <Octicons name="verified" size={17} style={{width:17,height:17,marginLeft:5,marginTop:7}} color="#1DA1F2" />
                          
                    }
                </View>
                
            </View>
            <View style={styles.postContent}>
                <ParsedText style={{fontSize:19}} 
                parse={[
                    {type:'url',style:styles.parsedurl,onPress:Urlpress},
                    {pattern: /@(?=.{3,20}(?:\s|$))[a-z][a-z0-9]+(?:[._][a-z0-9]+)?/ig, style: styles.mentiontextusername, onPress:Usernamepress, renderText:renderText},
                ]}>{item.post}</ParsedText>
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
    parsedurl:{
        color:'blue',
        fontWeight:'300'

    },
    mentiontextusername:{
        color:'blue',
        fontWeight:'500',
        
    }


    
});