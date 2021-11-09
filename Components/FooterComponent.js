import React,{useState,useEffect} from 'react';
import {View,Image,Text,ActivityIndicator} from 'react-native';
import { blueshade } from './defaultValues';


export default function FooterComponent(){
    const [loading,setLoading]=useState(false);
    const wait =(timeout)=>{
        return new Promise(resolve=>setTimeout(resolve,timeout))
    }
    useEffect(()=>{
        
        setLoading(true);
        wait(2000).then(()=>{
            setLoading(false);
        })
        
    },[])
    return(
    
        <View style={{height:350,marginTop:10,margin:5,backgroundColor:'#fff',borderRadius:15,elevation:3}}>
            {loading==false ?
                 <Text style={{fontSize:35,margin:15,fontWeight:'bold'}}>That's all folks</Text>   
             :(
                <View style={{margin:5}}>
                    {<ActivityIndicator size={24} color={blueshade}/>}
                </View>
             )}   
        </View>
    );
}