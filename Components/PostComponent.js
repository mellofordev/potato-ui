import React,{useState,useEffect,useCallback } from 'react';
import {View,Text,FlatList, ActivityIndicator, RefreshControl,Alert} from 'react-native';
import PostCard from './PostCardComponent';
import FooterComponent from './FooterComponent';

export default function PostComponent({apiUrl,topheader,issticky=0,onOpen}){
    const [isLoading,setIsLoading]=useState(false);
    const [data,setData]=useState([]);
    const [error,setError]=useState();
    const [isRefreshing,setIsRefreshing]=useState(false);
    const [fetchcount,setfetchcount]=useState(10);
    const [url,setUrl]=useState(apiUrl+fetchcount);
    
    const apirequest =()=>{
        
        fetch(url)
        .then((response)=>response.json())
        .then(data=>{
            setData(data.memes);
            setIsLoading(true);

        })
        .catch(error=>{
            setError(error);
            Alert.alert('Network error');
        })
        
    }
    useEffect(()=>{
        apirequest();
    },[])
    const fetchmore = (url)=>{
        
        fetch(url)
        .then(response =>response.json())
        .then((result =>{
            setData([...data,...result.memes]);
        }))
        .catch((error)=>{console.log(error)})
    }
    const wait = (timeout) => {
      return new Promise(resolve => setTimeout(resolve, timeout));
   }
    const onRefresh = useCallback(()=>{
        setIsRefreshing(true);
        wait(2000).then(()=>{
            setIsRefreshing(false);
            
        })
        apirequest();
    },[])
    return(
        <View> 
            {!isLoading ? <ActivityIndicator size={44} color='#7289DA' style={{marginTop:12}}/> :(
            <FlatList
                data={data}
                
                renderItem={({item})=><PostCard item={item} onOpen={onOpen}/>}
                keyExtractor={(item,index)=>index.toString()}
                ListFooterComponent={()=><FooterComponent/>}
                refreshControl={
                    <RefreshControl 
                    enabled={true} 
                    refreshing={isRefreshing}
                    onRefresh={onRefresh}/>}

                ListHeaderComponent={topheader()}
                stickyHeaderIndices={[issticky]}
                onEndReached={()=>{
            
                    setfetchcount(fetchcount+3); 
                    setUrl(apiUrl+fetchcount);
                    
                    fetchmore(url);
                
                    
                    
                }}
                
                
                
            />
            )}

        </View>
    );
}
