import React,{useState,useEffect,useCallback } from 'react';
import {View,FlatList, ActivityIndicator, RefreshControl,Alert,Text} from 'react-native';
import PostCard from './PostCardComponent';
import FooterComponent from './FooterComponent';
import FollowComponent from './FollowComponent';

export default function PostComponent({apiUrl,topheader,issticky=0,onOpen,item}){
    const [isLoading,setIsLoading]=useState(false);
    const [data,setData]=useState([]);
    const [error,setError]=useState(false);
    const [isRefreshing,setIsRefreshing]=useState(false);
    const [fetchcount,setfetchcount]=useState(10);
    const [url,setUrl]=useState(apiUrl+fetchcount);
    const [render,setRender]=useState([]);
    const recieved_token=item;
    const apirequest =()=>{
        
        fetch(url,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Token '+item,


            }

        })
        .then(response=>response.json())
        .then(data=>{
            
            if(data.results.feed){
                console.log(data.results.feed);
                setData(data.results.feed);
                setRender(data.results.follow);
            }else{
                
                setData(data.follow);
                console.log(data);
                
            }
            setIsLoading(true);

        })
        .catch(error=>{
            setError(error);
            console.log(error);
            Alert.alert('Network error');
        })
        
    }
    useEffect(()=>{
        apirequest();
        
    },[]);
    
    /*const reRender=useCallback(()=>{
        apirequest();
    },[])*/
    const fetchmore = ()=>{
        setfetchcount(fetchcount+3); 
        setUrl(apiUrl+fetchcount);
        console.log(url);
        fetch(url,{
            method:'GET',
            header:{
                'Content-Type':'application/json',
                'Authorization':'Token '+item,
            }
        })
        .then(response =>response.json())
        .then((result =>{
            console.log(recieved_token,url,result);
            setData([...data,...result.results.feed]);
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
        {!isLoading ? <ActivityIndicator size={44} color='#7289DA' style={{marginTop:12}}/> :[
        error==false ?     
        <FlatList
            data={data}
            
            renderItem={({item},index)=><PostCard item={item} onOpen={onOpen} token={recieved_token}/>}
            keyExtractor={(item,index)=>item.id}
            ListFooterComponent={()=><FooterComponent item={render}/>}
            refreshControl={
                <RefreshControl 
                enabled={true} 
                refreshing={isRefreshing}
                onRefresh={onRefresh}/>}

            ListHeaderComponent={topheader()}
            ListEmptyComponent={()=><FollowComponent item={render}/>}
            stickyHeaderIndices={[issticky]}
            onEndReached={()=>{
        
                fetchmore();
            
                
                
            }}
            
            
            
        />
        :(<View><Text>{error}</Text></View>)
        ]}

    </View>
    );

}
