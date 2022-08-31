import React,{useState,useEffect,useRef,useCallback} from 'react';
import {View,StyleSheet,Text,Image,RefreshControl,Dimensions,Alert, TouchableOpacity, ScrollView} from 'react-native';
import { ActivityIndicator,TextInput,Divider} from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import RButton from '../RButtonComponent';
import { Feather } from '@expo/vector-icons';
import FooterComponent from '../FooterComponent';
import { FixedBottom } from '../FixedBottomComponent';
import * as RootNavigation from '../RootNavigation';
export default function StackComment({route}){
    const [isloading,setIsLoading]=useState(false);
    const [error,setError]=useState();
    const [data,setData]=useState([]);
    const [text,setText]=useState('');
    const [btn,setBtn]=useState(false);
    const [isRefreshing,setIsRefreshing]=useState(false);
    const modalizeRef = useRef(null);
    const [stickers,setStickers]=useState([]);
    const onOpen=()=>{
        modalizeRef.current?.open();
        stickerApi();
    } 
    const get_width=Dimensions.get('window').width;
    const val =route.params.id;
    const token=route.params.t;
    
    const apireq =()=>{
        fetch('https://punfuel.pythonanywhere.com/api/comment/view/'+val,{
            method:'GET',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Token '+token
            }
        })
        .then(response=>response.json())
        .then(data=>{
            setData(data.comment); 
            setIsLoading(true);

            
        })
        .catch(error=>{setError(error)})
    }
    const postreq=(type_sticker=false,refer_sticker_id=0)=>{
        
        setBtn(true);
        fetch('https://punfuel.pythonanywhere.com/api/comment/'+route.params.id+'/',{
            method:'POST',
            headers:{
                
                'Content-Type':'application/json',
                'Authorization':'Token '+route.params.t,

            },
            body:JSON.stringify({
                comment: type_sticker==true ? null :text,
                sticker:type_sticker,
                sticker_id:refer_sticker_id
            })
            
        })
        .then(response=>response.json())
        .then(data=>{
            setBtn(false);
            Alert.alert(data.comments);
            setText('');
            wait(200).then(()=>{
                reRender();
            })
        })
        .catch(error=>{
            Alert.alert('Network error');
            setBtn(false);
            
        })
    }
    const stickerApi=()=>{
        fetch('https://punfuel.pythonanywhere.com/api/stickers/',{
            method:'GET',
            headers:{
                'Authorization':`Token ${route.params.t}`,
                'Content-Type':'application/json'
            }
        })
        .then(response=>response.json())
        .then((data)=>{
            setStickers(data.stickers);
        })
        .catch(error=>{
            console.log(error);
        })
    }
    useEffect(()=>{apireq();},[])
    const reRender=useCallback(()=>{
        apireq();
    },[])
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const EmptyComment=()=>{
        return(
        <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
                    
            <Text style={{textAlign:'center',fontSize:18}}>Be the first to comment for this post</Text>
        </View>
        );
    }
    const onRefresh = useCallback(()=>{
        setIsRefreshing(true);
        wait(2000).then(()=>{
            setIsRefreshing(false);
            
        })
        apireq();
    },[])
    const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
        const paddingToBottom = 20;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom;
      };
    
    return(
        <>
        <View style={styles.container}>
         {!isloading && <ActivityIndicator size={24} color='#7289DA' style={{marginTop:35}}/> }
         {data==[] && <EmptyComment/>}
         <ScrollView 
         refreshControl={
            <RefreshControl 
            enabled={true} 
            refreshing={isRefreshing}
            onRefresh={onRefresh}/>}

         >
        {stickers==[] && <Text>hold on we are loading some stickers...</Text>}      
         {data!=[] &&data.map((i,item)=>{
             
             return(
                <View style={styles.bottomsheetcontainer} key={item}>
                <View style={styles.box}>
                    <TouchableOpacity onPress={()=>{RootNavigation.push('StackProfile',{username:data[item].user,t:token})}}>
                    <Image style={{marginRight:15,height:45,width:45,borderRadius:10}} source={{uri:'https://punfuel.pythonanywhere.com/media/'+data[item].profile_pic}}/>
                    </TouchableOpacity>
                    <Text style={{marginRight:3,color:'#23272A',fontWeight:'900',fontFamily:'Roboto'}}>{(data[item].user).length>10 ?(data[item].user).slice(0,10)+'...':((data[item].user))}</Text>
                    {data[item].verified==true &&
                    <Image style={{width:16,height:16,marginTop:3,marginLeft:3}} source={{uri:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_verified.png'}}/>
                    }
                </View>
                <View style={{flexDirection:'column',marginLeft:55,top:-17}}>
                        <Text style={{fontSize:16}}>{data[item].comment}</Text>
                        {data[item].sticker==true && <Image source={{uri:data[item].sticker_img_url}} style={{height:100,width:100,margin:10}} />}
                </View>
            </View>
             );
         })    
         }
        {data.length>7 && <FooterComponent/>} 
        </ScrollView> 
        
        <FixedBottom>
            <TouchableOpacity  onPress={()=>{onOpen()}}>
            <View style={{height:30,width:'100%',marginBottom:24}}>
                <RButton title={'write your comment'}/>
            </View>
            </TouchableOpacity>
        </FixedBottom>
       
        </View>
        <Modalize ref={modalizeRef} snapPoint={400} modalHeight={500}>
            <View style={{flexDirection:'column'}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,margin:2,fontFamily:'Roboto',fontWeight:'normal',color:'grey'}}>comment as user</Text>
                <Divider/>
                </View>
                <View >
                {btn==false ?
                <View style={{flexDirection:'row'}}>
                <TextInput label='Write your comment' value={text} onChangeText={text=>setText(text)} style={{width:'90%',color:'#fff',marginLeft:5,borderRadius:10,backgroundColor:'white'}}/>
                <TouchableOpacity style={{margin:5,justifyContent:'center',alignItems:'center'}} 
                onPress={()=>{
                    if(text==''){
                        Alert.alert('Write your comment');
                    }else{
                        postreq();
                    }
                   
                    }}>
                    <Feather name="send" size={24} color="black" />
                 </TouchableOpacity>   
                </View>    
                :(
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>    
                <ActivityIndicator size={24}/>
                <Text style={{fontSize:18}}>Posting</Text>
                </View>
                )   
                }
                </View>
                
                
            </View>
            <View style={{margin:5}}>
                    <Text style={{fontSize:16,color:'#23272A'}}>suggested comments</Text>
                    <ScrollView contentContainerStyle={{flexDirection:'row',flexWrap:'wrap'}}>
                        {
                            stickers.map((item)=>{
                                return(
                                <View key={item.id.toString()}>
                                 <TouchableOpacity onPress={()=>{
                                     Alert.alert(`sticker ${item.label}`,'Post this sticker ?',[
                                         {text:'cancel'},
                                         {text:'yes',onPress:()=>{postreq(type_sticker=true,refer_sticker_id=item.id);}}
                                     ],{cancelable:false})
                                 }}>
                                 <Image source={{uri:item.sticker_img_url}} style={{height:100,width:100,margin:10}}/>
                                 </TouchableOpacity>   
                                </View>
                                );
                            })
                        }
                    </ScrollView>
            </View>
        </Modalize>
        </>
    );
}

const styles =StyleSheet.create({
    container:{
        
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#fff',
        flex:1,
        
        

    },
    bottomsheetcontainer:{
        flexDirection:'column',
        margin:15,
        
    },
    box:{
        flexDirection:'row',
        
    }
       
});