import React from 'react';
import {View,ScrollView} from 'react-native';
import { Appbar, Divider } from 'react-native-paper';
import ProfileCardComponent from '../ProfileCardComponent';
import PostComponent from '../PostComponent';

export default function StackProfile({navigation,route}){
    
    const user=route.params.username;
    const token=route.params.t;

    return( 
    <View style={{flex:1,backgroundColor:'#FCFCFC'}}>
        <Appbar.Header style={{backgroundColor:'#fff',elevation:0}}>
            <Appbar.BackAction  onPress={()=>{navigation.goBack(null)}}/>
            <Appbar.Content title={user}/>
        </Appbar.Header>
        <Divider/>
    
       
        <View>  
   
        <PostComponent apiUrl={'https://punfuel.pythonanywhere.com/user-posts/'+route.params.username+'/?limit=10'} 
         
           
           item={route.params.t}
           user={route.params.username}
           topheader={()=>{
               return(
                <View style={{flex:1}}>   
                <ProfileCardComponent 
                item={token} 
                url={'https://punfuel.pythonanywhere.com/accounts/api/profile/'+route.params.username+'/'}
                
                />
               </View> 
               );
           }}
        />
       </View>
    </View>      
    );
}
