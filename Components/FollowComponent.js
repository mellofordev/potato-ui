import React from 'react';
import {View,Text,Image,FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Button,Card,Title} from 'react-native-paper';
export default function FollowComponent({item}){

    return(
        <View style={{backgroundColor:'#fff'}}> 
        
            <Title style={{marginLeft:10}}>Follow some users to get started</Title>
                  
        <FlatList
           data={item}
           renderItem={({item})=>{
            return(   
            <View style={{height:350,width:250,marginTop:10,margin:5,backgroundColor:'#fff',borderRadius:15,elevation:3}}>
                <View style={{margin:5}}>
                    
                <Image style={{height:'70%',width:'100%'}} source={{uri:'https://punfuel.pythonanywhere.com'+item.pic}}/>
                <Text style={{textAlign:'center',fontSize:15,margin:5}}>{item.user}</Text>   
                <Button style={{height:50,borderRadius:15,marginTop:15,elevation:1}} mode='contained' color='#7289DA' disabled={false} onPress={console.log('pressed')}>
                    <Title style={{color:'white',fontStyle:'normal',textTransform:'none'}}>follow</Title>
                </Button>
                </View>
            </View> 
            );   
           }}
           keyExtractor={(item,index)=>{index.toString()}}
           horizontal={true}
        />
        </View>       
    );
}