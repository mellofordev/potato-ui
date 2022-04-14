import React from 'react';
import {View,StyleSheet,TextInput,ScrollView,Image} from 'react-native';
import {Card,Appbar,Title,Searchbar} from 'react-native-paper';
import { Feather } from '@expo/vector-icons'; 
import PostComponent from '../PostComponent';
import  { whitegreyshade } from '../defaultValues';
import { AuthContext } from '../AuthContext';
import * as RootNavigation from '../RootNavigation';
export default function Trending(){
    const [userinput,setUserInput]=React.useState('https://meme-api.herokuapp.com/gimme/');
    const options_obj=[{id:1,name:'trending',url:'https://dwgyu36up6iuz.cloudfront.net/heru80fdn/image/upload/c_fill,d_placeholder_thescene.jpg,fl_progressive,g_center,h_630,q_80,w_1200/v1569014006/teenvogue_hero_meme-review-season-1.jpg'},{id:2,name:'nft',url:'https://assets-global.website-files.com/5cc19fbd198b8d31a9c64876/6077d86b5e0f219f827f9890_nft%20logo.png'},{id:3,name:'stickers',url:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqJiiC8Dp-KXpmycd3VpPSnH5yU0OkEoqoU1NWd-aShxz0e5bJtnNOQYEvRdYIAf-QyYQ&usqp=CAU'}]
    const {gettoken} =React.useContext(AuthContext);
    return(
        

        <View style={{height:'100%',backgroundColor:'#fff'}}>
        <Appbar.Header style={{backgroundColor:'#fff',elevation:0}}>
          
          <Appbar.Content 
          title={'Trending'}  
          titleStyle={{position:'relative',right:0,left:6,elevation:0}}
          
          />
          <Appbar.Action icon={()=>
             <Feather name="search" color="black" size={24} /> 
          } onPress={()=>RootNavigation.push('SearchStackComponent')}/>
        </Appbar.Header>
        <View style={styles.container}>
        <PostComponent apiUrl='https://punfuel.pythonanywhere.com/api/home?limit=10'
            item={gettoken()}
            topheader={()=>{
                return(
                    <View>
                    <Card>
                        <Card.Cover source={{uri:'https://www.trendingus.com/wp-content/uploads/2019/12/Trending-Memes-india-2019.jpg'}} style={{margin:5,borderRadius:15}} />
                    </Card>
                   
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