import React,{useState,useEffect,useContext} from 'react';
import { View,Text,StyleSheet,FlatList,Image} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { AuthContext } from './AuthContext';

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
                     <View style={styles.commentContainer}>
                         <Text>post on {item.reference_post_id}</Text>
                         <View style={styles.commentContentContainer}>
                             <Image source={{uri:`https://punfuel.pythonanywhere.com/${item.profile_pic}`}} style={{borderRadius:55,height:55,width:55}}/>
                             <View style={{flexDirection:'column'}}>
                                 <Text style={{fontSize:15,fontWeight:'bold'}}>{item.user}</Text>
                                 {sticker ==false ? <Text>{item.comment}</Text>:(<Image source={{uri:item.sticker_img_url}}/>)}
                                 
                             </View>
                         </View>
                     </View>
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
        flexDirection:'row',
        justifyContent:'space-evenly',
        marginLeft:2
    }

})