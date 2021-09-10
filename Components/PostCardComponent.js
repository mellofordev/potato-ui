import React from 'react';
import {View,StyleSheet,Image,Text,TouchableOpacity} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import * as RootNavigation from './RootNavigation';
export default function PostCard({item,onOpen}){
    
    
    return(

    <View style={styles.container}>
           
    <View style={styles.postContainer}>
        <View style={{margin:5}}>
            <View style={styles.postHeader}>
                <TouchableOpacity onPress={()=>RootNavigation.navigate('StackProfile')}>
                <Image source={{uri:item.url}} style={{borderRadius:15,height:55,width:55,borderColor:'#fffaf0',borderWidth:1}}  />
                </TouchableOpacity>
                <View style={styles.postNameContainer}>
                    <Text style={{fontSize:19,marginLeft:15}}>@{item.author}</Text>
                    <Image style={{width:16,height:16,marginTop:6,marginLeft:3}} source={{uri:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_verified.png'}}/>
                
                </View>
                
            </View>
            <View style={styles.postContent}>
                <Text style={{fontSize:19}}>{item.title}</Text>
                <Image source={{uri:item.url}}  style={{resizeMode:'contain',width:undefined,height:undefined,aspectRatio:1}}/>
                <View style={styles.postIcons}>
                    <View style={{flexDirection:'row'}}>
                        <EvilIcons name="heart" size={34} color="#2C2F33" />
                        <Text style={{color:'#7289DA',marginTop:3}}>{item.ups}</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity onPress={()=>{RootNavigation.navigate('StackComment')}}>
                        <EvilIcons name="comment" size={34} color="#2C2F33" />
                        </TouchableOpacity>
                        <Text style={{color:'grey',marginTop:3}}>345k</Text>
                        
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
        

        

    },
    postContainer:{
        
        margin:0,
        
        flexDirection:'column',
        backgroundColor:'white',
        borderRadius:10,
        
        

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