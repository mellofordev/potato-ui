import React,{useRef,useEffect,useState, useContext} from 'react';
import {View,StyleSheet,Image,Text,FlatList, TouchableOpacity,} from 'react-native';
import {Appbar,Card,Title} from 'react-native-paper';
import PostComponent from '../PostComponent';
import { Modalize } from 'react-native-modalize';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../AuthContext';

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

export default function Home(){
    
    const {gettoken}=useContext(AuthContext);

    const modalizeRef = useRef(null);
    //const [token,setToken]=useState(null);

    const onOpen=()=>{
        modalizeRef.current?.open()
    } 

    return(
    <>
    <View>
        <Appbar.Header style={{backgroundColor:'#FCFCFC'}}>
            <Appbar.Content title={<Image source={{uri:'https://i.ibb.co/SKqmC0Y/maskable-icon.png'}} style={{height:55,width:55,borderRadius:15}}/>} titleStyle={{height:100}}/>
            
        </Appbar.Header>   
        
        
        <View style={{height:'100%',backgroundColor:'#FCFCFC'}}>
         

          <View style={styles.container}>
         {gettoken()!=null &&   
         <PostComponent apiUrl='https://punfuel.pythonanywhere.com/api/home?limit=' 
         onOpen={onOpen}
         topheader={()=>{
                     return(
                        <View style={{flexDirection:'column'}}>
                                    <Title style={{marginLeft:5,}}>Cool new people.</Title>
                                    <FlatList
                                    data={categories}
                                    keyExtractor={({id})=>id.toString()}
                                    
                                    renderItem={({item})=>{
                                        return(
                                        <View style={styles.CategoryButton}>
                                            <Image source={{uri:'https://punfuel.pythonanywhere.com/media/default.png/'}} style={{borderRadius:8,height:55,width:55}}/>
                                            <View style={{flexDirection:'column'}}>
                                            <Text style={{margin:2,fontSize:13,color:'#FCFCFC',textAlign:'center'}}>{(item.category).length<=20 ?item.category  :( (item.category).slice(0,18)+'...')}</Text>
                                            <TouchableOpacity>
                                            <Text style={{marginLeft:3,color:'#7289DA'}}>Follow</Text>
                                            </TouchableOpacity>
                                            </View>
                                        </View>
                                        
                                        );
                                    }}
                                    horizontal={true}
                                    showsHorizontalScrollIndicator={false}
                                    />

                        
                        </View>
                        );
         }}
         issticky={[0]}
         item={gettoken()}
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
    flexDirection:'row',
    backgroundColor:'#2C2F33',
    borderRadius:8,
    marginTop:5,
    width:150,
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