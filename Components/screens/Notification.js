import React, { useState,useContext,useEffect } from 'react';
import {View,TouchableOpacity,FlatList, Alert,Text} from 'react-native';
import {ActivityIndicator, Appbar, Card,Paragraph} from 'react-native-paper';
import { Feather } from '@expo/vector-icons';
import { AuthContext } from '../AuthContext';
import { blueshade } from '../defaultValues';
export default function Notification(){
    const [data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const {gettoken} =useContext(AuthContext);
    const notificationFetch=()=>{
        fetch('https://punfuel.pythonanywhere.com/api/notification/',{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Token '+gettoken()
            }
        })
        .then(response=>response.json())
        .then(data=>{
            setData(data.notification);
            setLoading(false);
        })
        .catch(error=>{
                Alert.alert('Sorry 😥','Cant update try checking your internet connection');
        })
    }
    useEffect(()=>{
        notificationFetch()
    },[data])
    return(
        <View style={{backgroundColor:'#FCFCFC',height:'100%'}}>
            <Appbar.Header style={{backgroundColor:'#fff'}}>
                <Appbar.Content title="Notification"/>
                <Appbar.Content 
                    title={
                        <TouchableOpacity>
                            <Feather name="message-circle" size={24} color="#2C2F33" />
                        </TouchableOpacity>
                    } 
                    style={{left:130,marginTop:3}}
                />
            </Appbar.Header>
            {loading ==false ?
            <FlatList 
            data={data}
            keyExtractor={({item},index)=>index.toString()}
            renderItem={({item})=>{
                return(
                <TouchableOpacity >
                    <Card style={{borderRadius:0}}>
                        <Card.Content style={{flexDirection:'row'}}>
                            <Paragraph  style={{fontSize:15,color:'grey'}}>
                                <Text style={{color:'black'}}>{item.fromuser}</Text> {item._type=='Liked'? 'liked your recent post':[item._type=='Following'?'started following you':item._type=='Commented'&&'commented on your post']}
                            </Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
                );
            }}
            ListEmptyComponent={()=>{
                return(
                    <View>
                        <Text style={{textAlign:'center',color:'grey',fontSize:20}}>No activity to show</Text>
                    </View>    
                )
            }}
            />
            :(
                <ActivityIndicator size={24} color={blueshade}/>
            )
            }
        </View>
    );
}