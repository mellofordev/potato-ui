import React from 'react';
import {View} from 'react-native';
import { Appbar } from 'react-native-paper';
import ProfileCardComponent from '../ProfileCardComponent';
import PostComponent from '../PostComponent';
export default function StackProfile({navigation}){
    const [data,setData]=React.useState([]);
    var profile_pic_medium='';
    var profile_name='';
    var item=[];
    const apireq =()=>{
        fetch('https://randomuser.me/api/')
        .then(response=>response.json())
        .then(data=>{
            
            
            profile_pic_medium=data.results[0].picture.medium;
            profile_name=data.results[0].name.first;
            item=[profile_pic_medium,profile_name];
            setData(item);

        }
        )
        .catch(error=>console.log(error))

    }
    React.useEffect(()=>{
        apireq();
    },[]);
    return(
        
    <View style={{flex:1}}>
        <Appbar.Header style={{backgroundColor:'#fff'}}>
            <Appbar.BackAction onPress={()=>{navigation.goBack(null)}}/>
            <Appbar.Content title={data[1]}/>
        </Appbar.Header>
        
    
       
 
          
        <PostComponent apiUrl='https://meme-api.herokuapp.com/gimme/' 
          topheader={()=>{
           return(
            <View style={{flex:1}}>   
                <ProfileCardComponent item={data}/>
           </View>
            );
           }}
           issticky={0.1} 
        />
    
    </View>
        
    );
}
