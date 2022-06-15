import React,{useState,useEffect,useContext} from 'react';
import { View,Text,StyleSheet,FlatList,Image} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './AuthContext';
import { Card } from 'react-native-paper';
import { blackshade, grayshadeprimary } from './defaultValues';
export default function CommentListComponent({route}){
    const [Data,setData]=useState([]);
    const [loading,setLoading]=useState(true);
    const {gettoken} = useContext(AuthContext);
    
    const apireq=()=>{
        fetch(`https://punfuel.pythonanywhere.com/api/user/comments/${route.params.username}/`,{
            method:'GET',
            headers:{
                'Authorization':'Token '+gettoken()
            }
        })
        .then(response=>response.json())
        .then(data=>{
            setData(data.comment);
            setLoading(false);
        })
        .catch(e=>{
            console.log(e);
        })
    }
    useEffect(()=>{
        apireq();
    },[])
    return(
        <View>
            {loading==true ? <ActivityIndicator color='black' size={24}/>:(
                <FlatList 
                 data={Data}
                 keyExtractor={(item)=>{item.id.toString();}}
                 renderItem={(item)=>{
                     
                     return(
                        <Card style={{flexDirection:'column'}}>
                        <Text style={{justifyContent:'flex-end',color:blackshade,fontSize:15,fontFamily:'Roboto'}}>post on {(item.item.reference_post_id).length>10 ? (item.item.reference_post_id.slice(0,10))+'...' : item.item.reference_post_id  } </Text>
                        <View style={styles.commentContentContainer}>
                            <Image source={{uri:`https://punfuel.pythonanywhere.com/media/${item.item.profile_pic}`}} style={{borderRadius:55,height:55,width:55}}/>
                            <View style={{flexDirection:'column',marginLeft:5}}>
                                <Text style={{fontSize:15,fontWeight:'bold'}}>{item.item.user}</Text>
                                {item.item.sticker ==false ? <Text>{item.item.comment}</Text>:(<Image source={{uri:item.item.sticker_img_url}} style={{height:35,width:35}}/>)}

                            </View>
                        </View>
                    </Card>
                     );
                 }}
                />
            )}
            
        </View>
    );
}

const styles=StyleSheet.create({
    commentContainer:{
        flexDirection:'column',
        margin:5,
        backgroundColor:'#ffff'
    },
    commentContentContainer:{
        flex:1,
        flexDirection:'row',
        marginTop:10,
        marginLeft:15
    }

})