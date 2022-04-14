import React from 'react';
import {View,Text} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import UserStickerComponent from './UserStickerComponent';
import CommentListComponent from './CommentListComponent';
import { Appbar } from 'react-native-paper';
import { blackshade, blueshade, grayshadeprimary } from './defaultValues';
const Tab =createMaterialTopTabNavigator();
export default function StackTopTabComponent({navigation,route}){
    const routename= route.params.routeName.toString();
    return(
        <>
        <Appbar.Header style={{backgroundColor:'white',elevation:0}}>
            <Appbar.BackAction onPress={()=>navigation.goBack()}/>
            <Appbar.Content title={route.params.username} />
        </Appbar.Header>
        <Tab.Navigator 
          initialRouteName={routename}
          screenOptions={{
              tabBarLabelStyle:{
                  fontStyle:'normal',fontFamily:'Roboto'
              },
              tabBarInactiveTintColor:grayshadeprimary,
              tabBarActiveTintColor:blackshade,
              tabBarIndicatorStyle:{backgroundColor:blackshade}

            }}
        >
            <Tab.Screen name="UserStickerListComponent" component={UserStickerComponent} options={{tabBarLabel:'stickers'}}/>
            <Tab.Screen name="CommentListComponent" component={CommentListComponent} options={{tabBarLabel:'comments'}}/>
        </Tab.Navigator>
        </>
    );
}