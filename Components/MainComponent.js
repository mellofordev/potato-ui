import React from 'react';
import Home from './screens/Home';
import Trending from './screens/Trending';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import {View,Text} from 'react-native';
import Notification from './screens/Notification';
import Profile from './screens/Profile';
import Post from './screens/Post';
const Tabs =createBottomTabNavigator();

export default function MainComponent(){
    return(
        <Tabs.Navigator tabBarOptions={{ 
            showLabel:false,
            style:{
                margin:3,
                bottom:5,
                borderRadius:15,
                position:'absolute',
                height:50,
                
            },
        }}
        >
         <Tabs.Screen component={Home} name="Home" options={{
             tabBarIcon:({focused})=>{
                 return(
                    <View style={{position:'absolute',top:15}}>
                      <Feather name="home" size={24} color={focused?'black':'grey'} />
                    </View>
                 );
                 

            },

         }}/>
         <Tabs.Screen component={Trending} name="Trending" options={{
             tabBarIcon:({focused})=>{
                 return(
                    <View style={{position:'absolute',top:15}}>
                      <Feather name="search" size={24} color={focused?'black':'grey'} />
                    </View>
                 );
                 

            },

         }} />
         <Tabs.Screen component={Post} name="Post" options={{
             tabBarIcon:({focused})=>{
                 return(
                    <View style={{position:'absolute',top:15}}>
                      <Feather name="plus-circle" size={24} color={focused?'black':'grey'} />
                    </View>
                 );
                 

            },

         }} />
         <Tabs.Screen component={Notification} name="Activity" options={{
             tabBarIcon:({focused})=>{
                 return(
                    <View style={{position:'absolute',top:15}}>
                      <Feather name="bell" size={24} color={focused?'black':'grey'} />
                    </View>
                 );
                 

            },

         }} />
         <Tabs.Screen component={Profile} name="Profile" options={{
             tabBarIcon:({focused})=>{
                 return(
                    <View style={{position:'absolute',top:15}}>
                      <Feather name="settings" size={24} color={focused?'black':'grey'} />
                    </View>
                 );
                 

            },

         }} />
        </Tabs.Navigator>
    );
}

