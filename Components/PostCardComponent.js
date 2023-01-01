import React,{useContext, useState} from 'react';
import {View,StyleSheet,Image,Text,TouchableOpacity, Alert,Button,Linking, Share} from 'react-native';
import { EvilIcons,MaterialCommunityIcons,Ionicons,Octicons} from '@expo/vector-icons';
import * as RootNavigation from './RootNavigation';
import ParsedText from 'react-native-parsed-text';
import {blackshade, blueshade, lightblueshade, whitegreyshade} from './defaultValues';
import { AuthContext } from './AuthContext';
import VideoCardComponent from './VideoCardComponent';
export default function PostCard({item,onOpen,token,key}){
   
    var uid=item.shareable_link;
    var user=item.user;
    const [like,setLike]=useState(item.liked);
    const [like_count,setLikeCount]=useState(item.like_count);
    const {gettoken} =useContext(AuthContext);
    const received_token =gettoken();
    const likedby=item.fresh_likes.likes;
    
    const onLike =()=>{
        if(like==false){
            setLike(true);
            setLikeCount(like_count+1);
            fetch('https://punfuel.pythonanywhere.com/api/like/'+item.shareable_link+'/',{
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
            fetch('https://punfuel.pythonanywhere.com/api/unlike/'+item.shareable_link+'/',{
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
    
    const shareOptions = {
        title: 'punfuel',
        message: `${item.pic!=null?item.pic:item.post}`, // Note that according to the documentation at least one of "message" or "url" fields is required
        url: item.pic,
        filename:item.pic,
        type:'image/jpeg'
      };
    const _share =()=>{
        Share.share(shareOptions);
    }  
    return(
     
    <View style={styles.container} key={key}>
         
    <View style={styles.postContainer}>
        <View style={{margin:5}}>
            <View style={styles.postHeader}>
                <TouchableOpacity onPress={()=>RootNavigation.navigate('StackProfile',{username:item.user,t:gettoken()})}>
                <Image source={{uri:'https://punfuel.pythonanywhere.com'+item.user_profile_pic}} style={{borderRadius:15,height:55,width:55,borderColor:'#fffaf0',borderWidth:1}}  />
                </TouchableOpacity>
                <View style={styles.postNameContainer}>
                    <Text style={{fontSize:19,marginLeft:15,fontWeight:'500'}}>@{item.user}</Text>
                    
                    { item.verified==true &&
                        <Octicons name="verified" size={17} style={{width:17,height:17,marginLeft:5,marginTop:7}} color={lightblueshade} />
                          
                    }
                    <View style={{flexDirection:'row',marginLeft:5,top:5}}>
                        <MaterialCommunityIcons name='robot-outline' size={19} color={"gray"}/>
                        <Text style={{color:'gray',margin:2,fontWeight:'600'}}>bot</Text>
                    </View>
                </View>
                
            </View>
            <View style={styles.postContent}>
                <ParsedText style={{fontSize:19}} 
                parse={[
                    {type:'url',style:styles.parsedurl,onPress:Urlpress},
                    {pattern: /@(?=.{3,20}(?:\s|$))[a-z][a-z0-9]+(?:[._][a-z0-9]+)?/ig, style: styles.mentiontextusername, onPress:Usernamepress, renderText:renderText},
                ]}>{item.post}</ParsedText>
                {(item.pic!=null) &&[
                   (item.video==false)? 
                   <TouchableOpacity onPress={()=>RootNavigation.push('StackImageViewer',{img:item.pic})}>
                        <Image source={{uri:item.pic}}  style={{resizeMode:'cover',width:'100%',height:undefined,aspectRatio:1,borderRadius:15,marginTop:3,backgroundColor:whitegreyshade}}/>
                    </TouchableOpacity>
                    :(
                        <>
                             <VideoCardComponent videouri={item.pic}/>
                                
                        </>
                    )
                ]
                }
                <View style={styles.postIcons}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{onLike();}}>
                        {
                        like==false?    
                        <Ionicons name="heart-outline" size={26} color={blackshade} />
                        :(<Ionicons name="heart-sharp" size={26} color={blueshade} />)
                        }
                        </TouchableOpacity>
                        <Text style={{color:blueshade,marginTop:3}}>{like_count}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{RootNavigation.push('StackComment',{id:uid,t:gettoken()})}}>
                        <EvilIcons name="comment" size={34} color={blackshade} />
                        </TouchableOpacity>
                        <Text style={{color:'grey',marginTop:3}}>{item.comment_count}</Text>
                        
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{_share()}}>
                        <EvilIcons name="share-apple" size={34} color={blackshade} />
                        </TouchableOpacity>
                        <Text style={{color:'grey',marginTop:3}}>share</Text>
                    </View>
                </View>
                {likedby!=[] &&
                <View style={{marginTop:5,flexDirection:'row'}}>
                    <Text style={{color:'grey'}}>liked by</Text>
                    <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>{console.log('press')}}>
                    {likedby.slice(0,3).map((obj,_k)=>{
                        
                        return (
                            <View key={_k}>
                                <Image source={{uri:'https://punfuel.pythonanywhere.com'+obj.pic}} style={{borderRadius:55,height:25,width:25,borderColor:whitegreyshade,borderWidth:1,left:-((_k*2)*5)}}/>
                            </View>
                        );
                    })    
                     
                    
                    } 
                    </TouchableOpacity> 
                </View>  
                }  
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
        color:lightblueshade,
        fontWeight:'300'

    },
    mentiontextusername:{
        color:lightblueshade,
        fontWeight:'600',
        
    }


    
});