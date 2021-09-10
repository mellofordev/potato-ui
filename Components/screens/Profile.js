import React,{useRef} from 'react';
import {View,TouchableOpacity,Text} from 'react-native';
import { Appbar,Divider } from 'react-native-paper';
import ProfileCardComponent from '../ProfileCardComponent';
import PostComponent from '../PostComponent';
import { Modalize } from 'react-native-modalize';

export default function Profile(){
    const flatdata =[{id:1,name:'settings'},{id:2,name:'verify account'},{id:3,name:'deactivate'}]
    const [data,setData]=React.useState([]);
    const [dynamicsnaps,setDynamicSnaps]=React.useState(500);
    const renderComponent =({item})=>{
        
        return(
            <View style={{margin:8}}>
                <TouchableOpacity style={{marginLeft:5}}>
                    <Text style={{fontSize:25,color:'grey'}}>{item.name}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    var profile_pic_medium='';
    var profile_name='';
    var item=[];
    const modalizeRef = useRef(null);
    const onOpen=()=>{
        modalizeRef.current?.open()
    } 
    const apireq =()=>{
        fetch('https://randomuser.me/api/')
        .then(response=>response.json())
        .then(data=>{
            
            
            profile_pic_medium=data.results[0].picture.medium;
            profile_name=data.results[0].name.first;
            item=[profile_pic_medium,profile_name];
            setData(item);

        }
        )
        .catch(error=>console.log(error))

    }
    React.useEffect(()=>{
        apireq();
    },[]);
    return(
    <>    
    <View style={{flex:1}}>
        <Appbar.Header style={{backgroundColor:'#fff'}}>
            <Appbar.Content title={data[1]}/>
            <Appbar.Action icon='account-cog'  style={{right:1}} onPress={()=>{setDynamicSnaps(300); onOpen();}}/>
        </Appbar.Header>
        
    
        <PostComponent apiUrl='https://meme-api.herokuapp.com/gimme/' 
          topheader={()=>{
           return(
            <View style={{flex:1}}>   
                <ProfileCardComponent item={data}/>
           </View>
            );
           }}
           issticky={0.1} 
        />
    
    </View>
    <Modalize snapPoint={dynamicsnaps} modalHeight={500} ref={modalizeRef}
    HeaderComponent={
        <View>
            <Text style={{fontSize:20,textAlign:'center',marginTop:3}}>additional settings</Text>
            <Divider/>
        </View>
    } 
    flatListProps={{
        data:flatdata,
        renderItem:renderComponent,
        keyExtractor:(item) =>{item.id},
        showsVerticalScrollIndicator:false,

    }}
    />
    </>
    );
}
