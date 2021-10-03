import React,{useState,useEffect} from 'react';
import {View,Text, Image,  StyleSheet} from 'react-native';
import { Card, Paragraph, Title, ActivityIndicator } from 'react-native-paper';
import * as RootNavigation from './RootNavigation';
import RButton from './RButtonComponent';

export default function ProfileCardComponent({item,url='https://punfuel.pythonanywhere.com/accounts/profile/'}){
    const [data,setData]=useState([]);
    
    const [loading,setLoading]=useState(true);
    const [is_edit_allowed,setIsEdit]=useState(false);
    const [is_follower,SetIsFollower]=useState(false);
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
            console.log(res.profile);
            setData(res.profile);
            
            if(res.update.editprofile!="false"){
                setIsEdit(true);

            }
            if(res.profile.is_follower==true){
                SetIsFollower(true);
            }

        }
        )
        .catch(error=>{
            console.log(error);
        })

    }

    useEffect(()=>{
        apireq();
        setLoading(false);
    },[]);        
        return(
            
               <View>
                   {loading==false ?
                    <Card style={{marginTop:5}}>
            
                        <Card.Content>
                            <View style={{flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                                <Image source={{uri:'https://punfuel.pythonanywhere.com'+data.user_profile_pic}} style={{height:95,width:95,borderRadius:15,borderColor:'#fffaf0',borderWidth:1}}/>
                                <View style={{flexDirection:'row'}}>
                                <Title style={{marginTop:5}}>@{data.user}</Title>
                                
                                </View>
                                <Paragraph>{data.bio}</Paragraph>
                                <View style={{width:'100%',margin:5}}>
                                {is_edit_allowed==true ?
                                <RButton title={'Edit Profile'} _mode_='outlined' _onpress={()=>RootNavigation.navigate('EditProfile')}/>
                                :[
                                    is_follower==false ?<RButton title={'Follow'}   _onpress={()=>RootNavigation.navigate('EditProfile')}/> :[<RButton title={'Following'}   _onpress={()=>RootNavigation.navigate('EditProfile')}/>]
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
                                            <Title style={styles.profileNumberOptions}>{data.follower_count}</Title>
                                            <Paragraph style={styles.paragraphColor}>Followers</Paragraph>
                                        </View>
                                        <View style={{flexDirection:'column',marginRight:27,marginHorizontal:25}}>
                                            <Title>{data.following_count}</Title>
                                            <Paragraph style={styles.paragraphColor}>Following</Paragraph>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </Card.Content>
                    </Card>:(<ActivityIndicator size={24}/>) }
                    <Card style={{marginTop:5,marginBottom:3}}>
                        <Card.Content>
                            <Title>Posts</Title>
                        </Card.Content>
                    </Card>
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
});