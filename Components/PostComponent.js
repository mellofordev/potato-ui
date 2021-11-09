import React,{useState,useEffect,useCallback,useContext } from 'react';
import {View, ActivityIndicator, RefreshControl,Alert,FlatList,Text,ScrollView,StyleSheet,Image,TouchableOpacity} from 'react-native';
import PostCard from './PostCardComponent';
import FooterComponent from './FooterComponent';
import { blackshade, whitegreyshade } from './defaultValues';

export default function PostComponent({apiUrl,topheader,issticky=0,onOpen,item}){
    const [isLoading,setIsLoading]=useState(false);
    const [data,setData]=useState([]);
    const [error,setError]=useState(false);
    const [isRefreshing,setIsRefreshing]=useState(false);
    const recieved_token=item;
    const [next,setNext]=useState(null);
    const categories =[
        {
            id:1,
            category:'11cbruh',
    
        },
        {
            id:2,
            category:'Funny.me',
            
        },
        {
            id:3,
            category:'thisisjustforfunandpun',
            
        },
        {
            id:4,
            category:'kindcoolmemerhere',
            
        },
    ];
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
    useEffect(()=>{
        apirequest();
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
                        {categories.map((item)=>{
                            return(
                                <View key={item.id} style={{justifyContent:'space-between',margin:5}}>
                                            
                                            <View style={{flexDirection:'column',backgroundColor:'white',height:150,width:150,marginLeft:5,justifyContent:'center',alignItems:'center',elevation:1,borderRadius:5}}>
                                            <Image source={{uri:'https://punfuel.pythonanywhere.com/media/default.png/'}} style={{borderRadius:8,height:99,width:99}}/>
                                            <Text style={{fontSize:18,color:blackshade,textAlign:'center'}}>{(item.category).length<=15 ?item.category  :( (item.category).slice(0,10)+'...')}</Text>
                                            <TouchableOpacity>
                                            <Text style={{marginLeft:3,color:'#7289DA',textAlign:'center'}}>Follow</Text>
                                            </TouchableOpacity>
                                            </View>
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