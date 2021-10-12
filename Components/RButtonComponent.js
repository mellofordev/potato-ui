import React from 'react';
import {View} from 'react-native';
import {Button,Title} from 'react-native-paper';

export default function RButton({title,_onpress,additional_styles,_is_disabled=false,_mode_='contained',color='#7289DA'}){
    return(
        <View>
                <Button style={{height:50,borderRadius:15,marginTop:15,elevation:1,additional_styles}} mode={_mode_} color={color} disabled={_is_disabled} onPress={_onpress}>
                    <Title style={{color:'white',fontStyle:'normal',textTransform:'none'}}>{title}</Title>
                </Button>
        </View>
    );

}