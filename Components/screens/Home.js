import React,{useRef, useContext} from 'react';
import {View,StyleSheet,Image,Text} from 'react-native';
import {Appbar,Divider,Title} from 'react-native-paper';
import PostComponent from '../PostComponent';
import { Modalize } from 'react-native-modalize';
import {AuthContext} from '../AuthContext';
import {whitegreyshade} from '../defaultValues';


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
        <Appbar.Header style={{backgroundColor:'#fff',elevation:0}}>
            <Appbar.Content title={<Image source={{uri:'https://i.ibb.co/SKqmC0Y/maskable-icon.png'}} style={{height:55,width:55,borderRadius:15}}/>} titleStyle={{height:100}}/>
            
        </Appbar.Header>   
        <Divider/>
        
        <View style={{height:'100%',backgroundColor:'#fff'}}>
         

          <View style={styles.container}>
         {gettoken()!=null &&   
         <View>
            
         <PostComponent apiUrl='https://punfuel.pythonanywhere.com/api/home?limit=10' 
         onOpen={onOpen}
         item={gettoken()}
         topheader={()=>{
             return(
                <View style={{flexDirection:'column',flex:1}}>
                  <Title>Feed.</Title>
                </View>
             );
         }}
         />
         </View>
         }
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

   shareFont:{
       fontSize:25,
       fontWeight:'bold',
       fontFamily:'Roboto',
       marginEnd:5
   }

});