import React from 'react';
import {View,StyleSheet,ScrollView,Image} from 'react-native';
import {Card,Appbar,Divider} from 'react-native-paper';
import { Feather } from '@expo/vector-icons'; 
import PostComponent from '../PostComponent';
import  { whitegreyshade } from '../defaultValues';
import { AuthContext } from '../AuthContext';
import * as RootNavigation from '../RootNavigation';

export default function Trending(){
    const [userinput,setUserInput]=React.useState('https://meme-api.herokuapp.com/gimme/');
    const options_obj=[{id:1,name:'trending',url:'https://lh3.googleusercontent.com/P-9lCom7JrWHqkR5KRZvNvXryFx1lqL2rfugDiWBQaEsx3W2kncx3kedTpc1j8h7Giu-sgHu4GnMq_BsdkgjorOQb7S2zmwg3m_YlI8=w600'},{id:2,name:'nft',url:'https://assets-global.website-files.com/5cc19fbd198b8d31a9c64876/6077d86b5e0f219f827f9890_nft%20logo.png'},{id:3,name:'stickers',url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqJiiC8Dp-KXpmycd3VpPSnH5yU0OkEoqoU1NWd-aShxz0e5bJtnNOQYEvRdYIAf-QyYQ&usqp=CAU'}]
    const {gettoken} =React.useContext(AuthContext);
    
    return(
        

        <View style={{height:'100%',backgroundColor:'#fff'}}>
        <Appbar.Header style={{backgroundColor:'#fff',elevation:0}}>
          
          <Appbar.Content 
          title={'Trending'}  
          titleStyle={{position:'relative',right:0,left:6,elevation:0,fontWeight:'800'}}
          
          />
          <Appbar.Action icon={()=>
             <Feather name="search" color="black" size={24} /> 
          } onPress={()=>RootNavigation.push('SearchStackComponent')}/>
        </Appbar.Header>
        <View style={styles.container}>
        <PostComponent apiUrl='https://punfuel.pythonanywhere.com/api/trending?limit=10'
            item={gettoken()}
            topheader={()=>{
                return(
                    <View>
                    <Card>
                    <Card.Cover source={{uri:'https://www.trendingus.com/wp-content/uploads/2019/12/Trending-Memes-india-2019.jpg'}} style={{margin:5,borderRadius:15}} />     
                        
                   
                    <ScrollView horizontal={true}>
                        
                            {options_obj.map(i => {
                               
                            return(
                                
                                <Card style={{margin:5,borderRadius:10,backgroundColor:whitegreyshade,height:100,width:100}}>
                                    <Card.Content>
                                        <Image source={{uri:i.url}} style={{height:'100%',width:'100%',resizeMode:'cover'}} />
                                        
                                    </Card.Content>
                                </Card>
                        
                            );
                        }) 
                        }
                        
                        
                    </ScrollView> 
                    </Card>
                    <Divider/>
                    </View>
                );
            }}
            issticky={0.1} 
            />
        </View>
        </View>
        
    );
}
const styles=StyleSheet.create({
    container:{
        
        flexDirection:'column',
        justifyContent:'center',
        marginTop:5,
        
    }
});