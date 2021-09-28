import React,{useState,useEffect,useRef} from 'react';
import {View,StyleSheet,Text,Image,FlatList,Dimensions,Alert} from 'react-native';
import { ActivityIndicator,Button,TextInput } from 'react-native-paper';
import { Modalize } from 'react-native-modalize';
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
            setData(data.comments); 
            setIsLoading(true);

            
        })
        .catch(error=>{setError(error)})
    }
    const postreq=()=>{
        if(text==''){
            Alert.alert('duh,write some comment');
        }else{
            setBtn(true);
        }
        fetch('https://punfuel.pythonanywhere.com/api/comment/'+val,{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'Authorization':'Token '+token,

            },
            body:JSON.stringify({
                comment:text
            })
        })
        .then(response=>response.json())
        .then(data=>{
            setBtn(false);
            console.log(data);
        })
        .catch(error=>{
            Alert.alert('Network error');
        })
    }
    useEffect(()=>{apireq();},[])
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
                <Image style={{marginRight:15,height:45,width:45,borderRadius:10}} source={{uri:'https://instamber.com/uploads/staticpage/imagepreview-10-f72578fe9f.png'}}/>
                
                <Text style={{marginRight:3,color:'#23272A',fontWeight:'900',fontFamily:'Roboto'}}>{(item.name).slice(0,10)+'...'}</Text>
                <Image style={{width:16,height:16,marginTop:3,marginLeft:3}} source={{uri:'https://s3-us-west-2.amazonaws.com/s.cdpn.io/1211695/twitter_verified.png'}}/>
                
            </View>
            <View style={{flexDirection:'column',marginLeft:55,top:-17}}>
                    <Text style={{fontSize:16}}>{item.body}</Text>
            </View>
        </View>);
         }}
        keyExtractor={(item,index)=>index.toString()}
        ListEmptyComponent={()=>{
            return(
                <View>
                    <Text style={{textAlign:'center'}}>Be the first to comment for this post</Text>
                </View>    
            );
        }}
        />
        )}
        <FixedBottom>
            <View style={{backgroundColor:'#fff',height:30,width:'100%'}}>
                <Button mode={'outlined'} color={'#5865F2'} style={{backgroundColor:'white',width:get_width,height:60}} onPress={()=>onOpen()}>Write your comment</Button>
            </View>
        </FixedBottom>
        </View>
        <Modalize ref={modalizeRef} snapPoint={400} modalHeight={500}>
            <View style={{flexDirection:'column'}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{fontSize:20,margin:2,fontFamily:'Roboto',fontWeight:'normal',color:'grey'}}>comment as user</Text>
                </View>
                {btn==false ?
                <TextInput label='Write your comment' value={text} onChangeText={text=>setText(text)} right={<TextInput.Icon name='send'/>}  onPress={()=>{postreq();}}/>
                :(
                <TextInput label='Write your comment' disabled={true} />
                )   
                }
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