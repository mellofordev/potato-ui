import React from 'react';
import {View,Image,Dimensions,Animated} from 'react-native';
import {PinchGestureHandler} from 'react-native-gesture-handler';
import { useAnimatedGestureHandler,useAnimatedStyle,useSharedValue, withTiming } from 'react-native-reanimated';
export default function ImageViewer({navigation,route}){
    const width =Dimensions.get("screen").width;
    const height=Dimensions.get("screen").height;
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
            <PinchGestureHandler 
               onGestureEvent={gestureHandle}
             >
              <Animated.Image source={{uri:route.params.img}} style={[{height:height,width:width,resizeMode:'center',},transformer]}/>
            </PinchGestureHandler>
        </View>
        
        </>
    );
}