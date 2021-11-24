import React,{useState,useEffect,useCallback,useContext } from 'react';
import {View, ActivityIndicator, RefreshControl,Alert,FlatList,Text,ScrollView,StyleSheet,Image,TouchableOpacity} from 'react-native';
import PostCard from './PostCardComponent';
import FooterComponent from './FooterComponent';
import { blackshade, whitegreyshade } from './defaultValues';
import * as RootNavigation from './RootNavigation';
export default function PostComponent({apiUrl,topheader,issticky=0,onOpen,item}){
    const [isLoading,setIsLoading]=useState(false);
    const [data,setData]=useState([]);
    const [error,setError]=useState(false);
    const [isRefreshing,setIsRefreshing]=useState(false);
    const recieved_token=item;
    const [next,setNext]=useState(null);
    const [suggestionBucket,setSuggestionBucket]=useState([]);
    const apirequest =()=>{
        
        fetch(apiUrl,{
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
                    
                setData(data.results.feed);
                
            }else{
                
                setData(data.follow);
                console.log(data);
                
            }
            setNext(data.next);
            setIsLoading(true);

        })
        .catch(error=>{
            setError(error);
            Alert.alert('Network error');
            setIsLoading(true);
        })
        
    }
    const usersuggestionApi=()=>{
        fetch('https://punfuel.pythonanywhere.com/api/suggestions/',{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Token '+recieved_token,

            }
        })
        .then(response=>response.json())
        .then(data=>{
            setSuggestionBucket(data.suggestions);
            console.log(data.suggestions);
        })
        .catch(e=>{
            console.log(e);
        })
    } 
    useEffect(()=>{
        apirequest();
        usersuggestionApi();
        const abortControl=new AbortController();
        return ()=>{
            abortControl.abort();
        }
        
    },[]);
    
    /*const reRender=useCallback(()=>{
        apirequest();
    },[])*/
    const fetchmore = ()=>{
        
        fetch(next,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Token '+recieved_token,
            }
        })
        .then(response =>response.json())
        .then(result =>{
            
            setData([...data,...result.results.feed]);
            setNext(result.next);
        })
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

    /*const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 50;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };*/

    return(
        <View> 
        {!isLoading ? <ActivityIndicator size={44} color='#7289DA' style={{marginTop:12}}/> :(
          
        <FlatList
            data={data}
            
            renderItem={({item,index})=>{
               return(
            <View key={item.id.toString()}>
                <PostCard  item={item} onOpen={onOpen} token={recieved_token}/>
                {index==2&& 
                <View>
                    <Text style={{marginLeft:5,color:'grey',fontSize:20}}>Cool new people</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {suggestionBucket==[] && 
                         <View>
                             <Text>Get started</Text>
                         </View>    
                        }
                        {suggestionBucket.map((item,k)=>{
                            return(
                                
                                <View key={k} style={{justifyContent:'space-between',margin:5}}>
                                            <TouchableOpacity onPress={()=>{RootNavigation.push('StackProfile',{username:item.user,t:recieved_token})}}>
                                            <View style={{flexDirection:'column',backgroundColor:'white',height:150,width:150,marginLeft:5,justifyContent:'center',alignItems:'center',elevation:1,borderRadius:5}}>
                                            <Image source={{uri:`https://punfuel.pythonanywhere.com/${item.user_profile_pic}`}} style={{borderRadius:8,height:99,width:99}}/>
                                            <Text style={{fontSize:18,color:blackshade,textAlign:'center'}}>{(item.user).length<=15 ?item.user  :( (item.user).slice(0,10)+'...')}</Text>
                                            <TouchableOpacity>
                                            <Text style={{marginLeft:3,color:'#7289DA',textAlign:'center'}}>Follow</Text>
                                            </TouchableOpacity>
                                            </View>
                                            </TouchableOpacity>
                                </View>
                            );
                        })}
                    </ScrollView>
                </View> 
                } 
            </View>
               );
        }}
            keyExtractor={(item,index)=>item.id.toString()}
            ListFooterComponent={()=>{
            
                if(data.length>0){
                    return(
                    <FooterComponent/>
                    );
                }else{
                    return(
                    <View>
                        <Text style={{textAlign:'center'}}>.</Text>
                    </View>
                    );
                }
            }}
            refreshControl={
                <RefreshControl 
                enabled={true} 
                refreshing={isRefreshing}
                onRefresh={onRefresh}/>}

            ListHeaderComponent={topheader()}
            stickyHeaderIndices={[0.1]}
            onEndReached={()=>{
        
                fetchmore();
            
                
                
            }}
            
            
            
        />
        
        )}

    </View>
    );

}

const styles = StyleSheet.create({
    Category:{
        margin:0,
        
    }, 
    CategoryButton:{
     height:55,
     flexDirection:'row',
     backgroundColor:'#2C2F33',
     borderRadius:8,
     marginTop:5,
     width:150,
     marginLeft:8,
     marginBottom:5,
     elevation:4,
     
    },
}); 