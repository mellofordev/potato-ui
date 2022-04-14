import React,{useState,useEffect} from 'react';
import {View,Text, Image,  StyleSheet,Alert, TouchableOpacity,Linking} from 'react-native';
import { Card, Paragraph, Title, ActivityIndicator } from 'react-native-paper';
import * as RootNavigation from './RootNavigation';
import RButton from './RButtonComponent';
import { Octicons } from '@expo/vector-icons';
import ParsedText from 'react-native-parsed-text';

export default function ProfileCardComponent({setTabRender,tabRender,item,url='https://punfuel.pythonanywhere.com/accounts/profile/'}){
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const [is_edit_allowed,setIsEdit]=useState(false);
    const [is_follower,SetIsFollower]=useState(false);
    const [followCount,setFollowCount]=useState(0);
    const [followingCount,setFollowingCount]=useState(0);
    const [mutualFriends,setMutualFriends]=useState([]);
    const apireq =()=>{
        
        fetch(url,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Token '+item,


            }

        })
        .then((response)=>response.json())
        .then(res=>{
            
            setData(res.profile);
            setFollowCount(res.profile.follower_count);
            setFollowingCount(res.profile.following_count);
            setMutualFriends(res.profile.mutual_friends);
            if(res.update.editprofile!="false"){
                setIsEdit(true);

            }
            if(res.profile.is_follower==true){
                SetIsFollower(true);
            }
            setLoading(false);
        }
        )
        .catch(error=>{
            console.log(error);
        })

    }
    const unfollow=()=>{
        SetIsFollower(false); 
        setFollowCount(followCount-1); 
        fetch('https://punfuel.pythonanywhere.com/api/unfollow/'+data.user+'/',{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Token '+item,

            }
        })
        .then(response=>response.json())
        .then(data=>{
            
            if(data.unfollow){
                Alert.alert('Unfollow',data.unfollowed);
                
            }
        })
        .catch(error=>{
            Alert.alert('Something went wrong!',error);
        })
    }
    const follow=()=>{
        SetIsFollower(true);
        setFollowCount(followCount+1);
        fetch('https://punfuel.pythonanywhere.com/api/follow/'+data.user+'/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Token '+item,

            }
        })
        .then(response=>response.json())
        .catch(error=>{
            Alert.alert('Something went wrong!',error);
           
        })
    }
    const Urlpress=(url,matchIndex)=>{
        Linking.openURL(url);
    }
    useEffect(()=>{
        apireq();
        
        
    },[]);
        
        return(
            <View>
               {data!='Profile not found'?
                   <View>
                   
                    <Card style={{marginTop:5}}>
            
                        <Card.Content>
                            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <Image source={{uri:'https://punfuel.pythonanywhere.com'+data.user_profile_pic}} style={{height:95,width:95,borderRadius:15,borderColor:'#fffaf0',borderWidth:1,backgroundColor:'#FCFCFC'}}/>
                                <View style={{flexDirection:'row'}}>
                                <Title style={{marginTop:5}}>{loading==false?'@'+(data.user):'loading...'}</Title>
                                {data.verified==true && <Octicons name="verified" size={16} style={{width:18,height:18,marginLeft:5,marginTop:15}} color="#1DA1F2" />}
                                </View>
                                <Paragraph>
                                <ParsedText 
                                  parse={[
                                      {type:'url',style:styles.url,onPress:Urlpress}
                                  ]}
                                >{data.bio}</ParsedText>
                                </Paragraph>
                                <View style={{flexDirection:'row'}}>

                                {followingCount>=3&&<Image source={{uri:'https://i.pinimg.com/170x/c6/1d/b5/c61db53bf914bcc3df879c09517ef6fb.jpg'}} style={{height:30,width:30}}/>}
                                {followCount>=3&&<Image source={{uri:'https://toppng.com/uploads/preview/yan-cat-practice-vector-by-cheesefaceman1-on-deviantart-nyan-cat-emoji-gif-11563236761nimgongmvn.png'}} style={{height:30,width:30}}/>}
                                {data.post_count>=10 &&<Image source={{uri:'https://img.favpng.com/5/0/15/nyan-cat-computer-icons-desktop-wallpaper-png-favpng-KPZZ22ZH3FzTtbxD2s5UG1VhZ.jpg'}} style={{height:30,width:30}}/>}
                                
                                </View>
                                {mutualFriends.length!=0 &&
                                <View style={{flexDirection:'row'}}>
                                    
                                    <Text>followed by </Text>
                                    {mutualFriends.map((item)=>{
                                       return(
                                           <View key={item}>
                                            <Text style={{fontWeight:'bold'}}>{item} </Text>
                                           </View> 
                                       );
                                    }
                                    )}
                                </View>  
                                }  
                                <View style={{width:'100%',margin:5}}>
                                {is_edit_allowed==true ?
                                <RButton title={'Edit Profile'}   _onpress={()=>RootNavigation.navigate('EditProfile',{bio:data.bio,img:data.user_profile_pic,t:item})}/>
                                :[
                                    is_follower==false ?<RButton title={loading==false ?'Follow':'Loading...'}   _onpress={()=>{follow();}}/> :(<RButton title={'Following'} color={'#2C2F33'} _onpress={()=>{unfollow();}} />)
                                ]
                                }
                                </View>
                                <View style={styles.profilebox}>
                                    <View style={{marginLeft:7,flexDirection:'row'}}>
                                        <View style={{flexDirection:'column',marginRight:27,marginHorizontal:25}}>
                                            <Title style={styles.profileNumberOptions}>{data.post_count}</Title>
                                            <Paragraph style={styles.paragraphColor}>Posts</Paragraph>
                                        </View>
                                        <View style={{flexDirection:'column',marginRight:27,marginHorizontal:25}}>
                                            <TouchableOpacity onPress={()=>{RootNavigation.push('FollowStackComponent',{username:data.user,token:item,type:'followers'})}}>
                                            <Title style={styles.profileNumberOptions}>{followCount}</Title>
                                            <Paragraph style={styles.paragraphColor}>Followers</Paragraph>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{flexDirection:'column',marginRight:27,marginHorizontal:25}}>
                                            <TouchableOpacity onPress={()=>{RootNavigation.push('FollowStackComponent',{username:data.user,token:item,type:'following'})}}>
                                            <Title>{followingCount}</Title>
                                            <Paragraph style={styles.paragraphColor}>Following</Paragraph>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </Card> 
                    
                    <Card style={{marginTop:5,marginBottom:3}}>
                        <Card.Content style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <TouchableOpacity >
                                <Title style={{color:'black',fontSize:15}}>Post</Title>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>RootNavigation.push('StackTopTabComponent',{routeName:"UserStickerListComponent",username:data.user})} >
                                <Title style={{color:'gray',fontSize:15}}>Stickers</Title>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>RootNavigation.push('StackTopTabComponent',{routeName:"CommentListComponent",username:data.user})}  >
                                <Title style={{color:'gray',fontSize:15}}>Comments</Title>
                            </TouchableOpacity>
                            <TouchableOpacity >
                                <Title style={{color:'gray',fontSize:15}}>nfts</Title>
                            </TouchableOpacity>
                            
                        </Card.Content>
                    </Card>
                    {data.post_count==0 &&
                        <View style={{marginTop:5,marginBottom:3,height:300}}>
                            
                                <Title style={{textAlign:'center'}}>Nothing here...</Title>
                            
                        </View>

                    }
                </View>
                :(
                    <Title style={{textAlign:'center',color:'grey'}}>{data}</Title>
                )
            }
                </View>

        );

    
}
const styles =StyleSheet.create({
    profilebox:{
        flexDirection:'row',
        marginTop:7,
        shadowColor:"#fff",
        shadowOffset:{width:0,height:0.1,},
        shadowOpacity:0.1,
        shadowRadius:0.2,
        elevation: 1,
        width:'98.8%',
        borderRadius:15,
        height:55,
        backgroundColor:'#FCFCFC',
        alignItems:'center',
        justifyContent:'center'
    },
    paragraphColor:{
        color:'grey',
    },
    profileNumberOptions:{
        justifyContent:'space-evenly'
    },
    tabBarText:{
        color:'grey',
        fontSize:15,
    },
    url:{
        color:'blue',
        fontStyle:'italic',
    }
});