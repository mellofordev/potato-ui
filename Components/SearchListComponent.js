import { View,FlatList,TouchableOpacity,Image,Text,StyleSheet } from "react-native";
import {ActivityIndicator, Card } from 'react-native-paper';
import * as RootNavigation from './RootNavigation';
export default function SearchListComponent({props,loading,token}){
    console.log(props);
    return(
        <FlatList
        data={props}
        keyExtractor={(item)=>{item.id.toString()}}
        
        renderItem={({item})=>{
           return(
             <View>
                 <Card>
                     {loading==true ? <ActivityIndicator color="black" size={24}/> :(
                         <TouchableOpacity style={styles.profilecard} onPress={()=>{RootNavigation.push('StackProfile',{username:item.user,t:token})}}>
                         <Image source={{uri:`https://punfuel.pythonanywhere.com/${item.user_profile_pic}`}} style={styles.profilepic}/>
                         <Text style={styles.profiletext}>{item.user}</Text>
             
                     </TouchableOpacity>
                     )}
                 </Card>
                 
             </View>
           );
        }}
        />
    );
}

const styles = StyleSheet.create({
    profilecard:{
        flexDirection:'row',
        margin:10
    },
    profilepic:{
        height:50,
        width:50,
        borderRadius:55
    },
    profiletext:{
        fontSize:25,
        fontWeight:'900',
        fontFamily:'Roboto',
        marginLeft:15

    }
});