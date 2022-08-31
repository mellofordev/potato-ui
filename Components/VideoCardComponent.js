import React from 'react';
import {Video } from 'expo-av';
import {View,Text,TouchableOpacity} from 'react-native';
export default function VideoCardComponent({videouri}){
    const video =React.useRef(null);
    const [playBack,setPlayBack]=React.useState({});
    
    return(
        <View style={{
            flex:1
        }}>
                        <Video
                            ref={video}
                            
                            source={{uri:videouri}}
                            style={{margin:5,borderRadius:10,height:300,backgroundColor:'black'}}
                            resizeMode='contain'
                            isLooping
                            useNativeControls
                            usePoster
                            
                            onPlaybackStatusUpdate={(status)=>{setPlayBack(()=>status)}}
                        />
                           
                               
                        
        </View>
    );
}