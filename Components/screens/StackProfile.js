import React from 'react';
import {View} from 'react-native';
import { Appbar } from 'react-native-paper';
import ProfileCardComponent from '../ProfileCardComponent';
import PostComponent from '../PostComponent';
export default function StackProfile({navigation,route}){
    
    const user=route.params.username;
    const token=route.params.t;
    
    return(
        
    <View style={{flex:1}}>
        <Appbar.Header style={{backgroundColor:'#fff'}}>
            <Appbar.BackAction  onPress={()=>{navigation.goBack(null)}}/>
            <Appbar.Content title={user}/>
        </Appbar.Header>
        
    
       
 
          
        <PostComponent apiUrl='https://punfuel.pythonanywhere.com/api/home?limit=' 
          topheader={()=>{
           return(
            <View style={{flex:1}}>   
                <ProfileCardComponent item={token} url={'https://punfuel.pythonanywhere.com/accounts/api/profile/'+user+'/+'}/>
           </View>
            );
           }}
           issticky={0.1} 
           token={token}
           user={user}
        />
    
    </View>
        
    );
}
