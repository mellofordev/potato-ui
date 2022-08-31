import React from 'react';
import {View,Dimensions,Animated,Button} from 'react-native';
import {PinchGestureHandler} from 'react-native-gesture-handler';
import {Video} from 'expo-av';
import { useAnimatedGestureHandler,useAnimatedStyle,useSharedValue, withTiming } from 'react-native-reanimated';
export default function ImageViewer({navigation,route}){
    const width =Dimensions.get("screen").width;
    const height=Dimensions.get("screen").height;
    const video =React.useRef(null);
    const [playBack,setPlayBack]=React.useState({});
    const closeViewer =()=>{
        navigation.goBack(null);
    }
    const scale =useSharedValue(1);
    const gestureHandle = useAnimatedGestureHandler<PinchGestureHandler>({
        onActive:(event)=>{
            scale.value=event.scale;
        },
        onEnd:()=>{
            scale.value=withTiming(1);
        }
    });
    const transformer = useAnimatedStyle(()=>{
        return{
            transform:[{scale:scale.value}]
        
            };
    })
    return(
        <>
        <View style={{height:'100%',backgroundColor:'black',flexDirection:'column',flex:1}}>
            {
                route.params.img!=null?
                <PinchGestureHandler 
               onGestureEvent={gestureHandle}
             >
              <Animated.Image source={{uri:route.params.img}} style={[{height:height,width:width,resizeMode:'center',},transformer]}/>
            </PinchGestureHandler>
            :(
                <>
                        <Video
                            ref={video}
                            useNativeControls
                            source={{uri:'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'}}
                            style={{margin:5,borderRadius:10,height:400}}
                            resizeMode='contain'
                            isLooping

                            onPlaybackStatusUpdate={(status)=>{setPlayBack(()=>status)}}
                        />
                        <View>
                            <Button  title={playBack.isPlaying?'Pause':'Play'} onPress={()=>playBack.isPlaying?video.current.pauseAsync():video.current.playAsync()}/>
                        </View>
                 </>
            )
            }
        </View>
        
        </>
    );
}