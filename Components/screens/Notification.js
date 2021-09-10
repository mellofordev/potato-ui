import React from 'react';
import {View,TouchableOpacity,FlatList} from 'react-native';
import {Appbar, Card,Paragraph} from 'react-native-paper';
import { Feather } from '@expo/vector-icons';

export default function Notification(){
    return(
        <View>
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
            <FlatList 
            data={[{id:1,notifcation:'@user started following you'},{id:2,notifcation:'@user liked your meme'},{id:3,notifcation:'you recieved a new message from @user'}]}
            keyExtractor={({id},index)=>id.toString()}
            renderItem={({item})=>(
                <TouchableOpacity >
                    <Card style={{borderRadius:0}}>
                        <Card.Content style={{flexDirection:'row'}}>
                            <Paragraph  style={{fontSize:17,color:'grey'}}>{item.notifcation}</Paragraph>
                        </Card.Content>
                    </Card>
                </TouchableOpacity>
            )}
            
            />
        </View>
    );
}