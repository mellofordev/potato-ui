import React,{useState,useEffect,useRef,useCallback} from 'react';
import {View,StyleSheet,Text,Image,FlatList,Dimensions,Alert, TouchableOpacity} from 'react-native';
import { ActivityIndicator,TextInput,Divider} from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
import RButton from '../RButtonComponent';
import { Feather } from '@expo/vector-icons';
import FooterComponent from '../FooterComponent';
export default function StackComment({route}){
    const [isloading,setIsLoading]=useState(false);
    const [error,setError]=useState();
    const [data,setData]=useState([]);
    const [text,setText]=useState('');
    const [btn,setBtn]=useState(false);
    const modalizeRef = useRef(null);
    const onOpen=()=>{
        modalizeRef.current?.open()
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
    const postreq=()=>{
        console.log('pressed');
        setBtn(true);
        fetch('https://punfuel.pythonanywhere.com/api/comment/'+route.params.id+'/',{
            method:'POST',
            headers:{
                
                'Content-Type':'application/json',
                'Authorization':'Token '+route.params.t,

            },
            body:JSON.stringify({
                    comment:text
                    
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
    useEffect(()=>{apireq();},[])
    const reRender=useCallback(()=>{
        apireq();
    },[])
    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }
    const FixedBottom =({children})=>{
        return(
        <View style={{position:'absolute',bottom:10,right:0,left:0,marginBottom:16}}>
            {children}
        </View>);
    }
    return(
        <>
        <View style={styles.container}>
         {!isloading? <ActivityIndicator size={24} color='#7289DA' style={{marginTop:35}}/> :(  
        <FlatList
         data={data}
         renderItem={({item})=>{
        return(
        <View style={styles.bottomsheetcontainer}>
            <View style={styles.box}>
                <Image style={{marginRight:15,height:45,width:45,borderRadius:10}} source={{uri:'https://punfuel.pythonanywhere.com/media/'+item.profile_pic}}/>
                
                <Text style={{marginRight:3,color:'#23272A',fontWeight:'900',fontFamily:'Roboto'}}>{(item.user).length>10 ?(item.user).slice(0,10)+'...':((item.user))}</Text>
                {item.verified==true &&
                <Image style={{width:16,height:16,marginTop:3,marginLeft:3}} source={{uri:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_verified.png'}}/>
                }
            </View>
            <View style={{flexDirection:'column',marginLeft:55,top:-17}}>
                    <Text style={{fontSize:16}}>{item.comment}</Text>
            </View>
        </View>);
         }}
        keyExtractor={(item,index)=>index.toString()}
        ListEmptyComponent={()=>{
            return(
                <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
                    
                    <Text style={{textAlign:'center',fontSize:18}}>Be the first to comment for this post</Text>
                </View>    
            );
        }}
        ListFooterComponent={()=>{
            return(
            <FooterComponent item={data}/>
            );
        }}
        />
        )}
        <FixedBottom>
            <TouchableOpacity style={{marginRight:12}} onPress={()=>{onOpen()}}>
            <View style={{height:30,width:'100%',marginBottom:24,margin:5}}>
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
                <TextInput label='Write your comment' value={text} onChangeText={text=>setText(text)} style={{width:'90%',color:'#fff',marginLeft:5}}/>
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
                <View style={{margin:5}}>
                    <Text style={{fontSize:16,color:'#23272A'}}>suggested comments</Text>
                </View>
            </View>
        </Modalize>
        </>
    );
}

const styles =StyleSheet.create({
    container:{
        marginTop:10,
        flexDirection:'column',
        justifyContent:'center',
        backgroundColor:'#fff',
        flex:1,
        borderRadius:10,
        

    },
    bottomsheetcontainer:{
        flexDirection:'column',
        margin:15,
        
    },
    box:{
        flexDirection:'row',
        
    }
       
});