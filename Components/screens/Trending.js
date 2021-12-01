import React from 'react';
import {View,StyleSheet,TextInput} from 'react-native';
import {Card,Appbar,Title,Searchbar} from 'react-native-paper';

import PostComponent from '../PostComponent';
export default function Trending(){
    const [userinput,setUserInput]=React.useState('https://meme-api.herokuapp.com/gimme/');
    return(
        

        <View style={{height:'100%',backgroundColor:'#fff'}}>
        <Appbar.Header style={{backgroundColor:'#fff',elevation:0}}>
          
          <Appbar.Content 
          title={<Searchbar placeholder='Search ' onChangeText={(q)=>{setUserInput(q)}} value={userinput} style={{marginBottom:3,borderRadius:10,width:300}}/>}  
          titleStyle={{position:'relative',right:0,left:6,elevation:0}}
          
          />
        </Appbar.Header>
        <View style={styles.container}>
        <PostComponent apiUrl='https://punfuel.pythonanywhere.com/api/home?limit=10'
            topheader={()=>{
                return(
                    <View>
                    <Card>
                        <Card.Cover source={{uri:'https://instamber.com/uploads/staticpage/imagepreview-10-f72578fe9f.png'}} />
                    </Card>
                     
                    <Card style={{marginTop:5}}>
                        <Card.Content >
                            <Title>Trending</Title>
                        </Card.Content>
                    </Card>
                    
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