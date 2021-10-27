import React, { useEffect } from 'react';
import {View} from 'react-native';
import { Appbar } from 'react-native-paper';
import ProfileCardComponent from '../ProfileCardComponent';
import PostComponent from '../PostComponent';

export default function StackProfile({navigation,route}){
    
    const user=route.params.username;
    const token=route.params.t;

    return( 
    <View style={{flex:1,backgroundColor:'#FCFCFC'}}>
        <Appbar.Header style={{backgroundColor:'#fff'}}>
            <Appbar.BackAction  onPress={()=>{navigation.goBack(null)}}/>
            <Appbar.Content title={user}/>
        </Appbar.Header>
        
    
       
 
          
        <PostComponent apiUrl={'https://punfuel.pythonanywhere.com/user-posts/'+route.params.username+'/?limit='} 
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
           issticky={0.1} 
           item={route.params.t}
           user={route.params.username}
           
        />
    
    </View>      
    );
}
