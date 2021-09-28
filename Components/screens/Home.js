import React,{useRef,useEffect,useState} from 'react';
import {View,StyleSheet,Image,Text,FlatList,} from 'react-native';
import {Appbar,Card} from 'react-native-paper';
import PostComponent from '../PostComponent';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
const categories =[
    {
        id:1,
        category:'Ghost mode',

    },
    {
        id:2,
        category:'Funny',
        
    },
    {
        id:3,
        category:'Short videos',
        
    },
    {
        id:4,
        category:'Awesome meme',
        
    },
];

export default function Home(){
    const [token,setToken]=useState(null);
    const getToken = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          setToken(value);
        } catch(e) {
          console.log(e);
        }
        
      }
    const modalizeRef = useRef(null);
    //const [token,setToken]=useState(null);

    const onOpen=()=>{
        modalizeRef.current?.open()
    } 
    useEffect(()=>{
        getToken();
    },[])
    return(
    <>
    <View>
        <Appbar.Header style={{backgroundColor:'#FCFCFC'}}>
            <Appbar.Content title={<Image source={{uri:'https://i.ibb.co/SKqmC0Y/maskable-icon.png'}} style={{height:55,width:55,borderRadius:15}}/>} titleStyle={{height:100}}/>
            
        </Appbar.Header>   
        
        
        <View style={{height:'100%'}}>
         

          <View style={styles.container}>
         {token!=null &&   
         <PostComponent apiUrl='https://punfuel.pythonanywhere.com/api/home?limit=' 
         onOpen={onOpen}
         topheader={()=>{
                     return(
                        <View>
                            
                                    <FlatList
                                    data={categories}
                                    keyExtractor={({id})=>id.toString()}
                                    renderItem={({item})=>{
                                        return(
                                        <View style={styles.CategoryButton}>
                                            <Text style={{margin:2,fontSize:20,color:'#FCFCFC'}}>{item.category}</Text>
                                        </View>
                                        
                                        );
                                    }}
                                    horizontal={true}
                                    />

                        
                        </View>
                        );
         }}
         issticky={[0]}
         item={token}
         />} 
         </View>  
        </View>
        
    </View>
    
    <Modalize snapPoint={300} modalHeight={600}   ref={modalizeRef} >
    <View style={{flexDirection:'column',marginLeft:8,marginTop:50}}>
       <View style={{flexDirection:'column'}}>
        <Text style={styles.shareFont}>share</Text>
        <View style={{flexDirection:'row',margin:0}}>
            <Text>functionwhatsApp</Text>
            <Text>Embed</Text>
        </View>
        </View>
        <View style={{flexDirection:'column'}}>
        <Text style={styles.shareFont}>source</Text>
        <View style={{flexDirection:'row',margin:3}}>
            <Text style={{color:'grey',}}>this meme is auto scrapped by our algorithm</Text>
        </View>
        </View>
    </View>
    </Modalize>
    
    </>
    );
}
const styles=StyleSheet.create({
    container:{
        flexDirection:'column',
        justifyContent:'center',
        
        
   }, 
   Category:{
       margin:0,
       
   }, 
   CategoryButton:{
    height:55,
    
    backgroundColor:'#2C2F33',
    borderRadius:8,
    marginTop:5,
    width:100,
    marginLeft:8,
    marginBottom:5,
    elevation:4,
    
   },
   shareFont:{
       fontSize:25,
       fontWeight:'bold',
       fontFamily:'Roboto',
       marginEnd:5
   }

});