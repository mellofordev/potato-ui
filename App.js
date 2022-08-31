
import React from 'react';
import {Image} from 'react-native';
import { navigationRef } from './Components/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/screens/Login';
import Signup from './Components/screens/Signup';
import MainComponent from './Components/MainComponent';
import StackProfile from './Components/screens/StackProfile';
import StackComment from './Components/screens/StackComment';
import { AuthContext } from './Components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditProfile from './Components/EditProfile';
import FollowComponent from './Components/FollowComponent';
import FollowStackComponent from './Components/FollowStackComponent';
import ImageViewer from './Components/StackImageViewer';
import ForgotPassword from './Components/screens/ForgotPassword';
import SearchStackComponent from './Components/SearchStackComponent';
import StackTopTabComponent from './Components/StackTopTabComponent';
import Post from './Components/screens/Post';
const Stack =createStackNavigator();

function App(){
  
  const [token,setToken]=React.useState(null);
 
  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
      setToken(value);
    } catch (e) {
      // saving error
    }
  }

  const getToken = async () => {
    try {
      const value = await AsyncStorage.getItem('token')
      setToken(value);
    } catch(e) {
      console.log(e);
    }
    
  }
  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setToken(null);
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(()=>{
    getToken();
    
  },[]);
  const context=React.useMemo(()=>({
    login:(get_token)=>{
      storeToken(get_token);
      
    },
    signup:(get_tokens)=>{
      storeToken(get_tokens);
    },
    logout:()=>{
      
      removeToken();
      
      
    },
    gettoken:()=>{
      getToken();
      return token;
    },

  })); 
     
     return(
      <AuthContext.Provider value={context}>
      <NavigationContainer ref={navigationRef}>
      {token==null ?
      <Stack.Navigator>
         <Stack.Screen options={{headerTitle:()=><Image source={{uri:'https://i.ibb.co/SKqmC0Y/maskable-icon.png'}} style={{width:50,resizeMode: 'contain', height:56,borderRadius:15}}/>}} name="Login" component={Login}/>
         <Stack.Screen name="Signup" component={Signup} options={{headerStyle:{elevation:0}}}/>
         <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{headerStyle:{elevation:0}}} />
      </Stack.Navigator>
      :(
      <Stack.Navigator>
          <Stack.Screen name="MainComponent" component={MainComponent} options={{headerShown:false}}/>
          <Stack.Screen name="StackProfile" component={StackProfile} options={{headerShown:false}}/>
          <Stack.Screen name="StackComment" component={StackComment} options={{headerStyle:{elevation:0},title:'comment'}} />
          <Stack.Screen name="EditProfile" component={EditProfile}/>
          <Stack.Screen name="FollowComponent" component={FollowComponent}/>
          <Stack.Screen name="FollowStackComponent" component={FollowStackComponent} options={{headerShown:false}}/>
          <Stack.Screen name="StackImageViewer" component={ImageViewer} options={{headerTitleStyle:{color:'white'},headerTransparent:true,title:'Image',headerTintColor:'#ffff'}} />        
          <Stack.Screen name="SearchStackComponent" component={SearchStackComponent} options={{headerShown:false}} />
          <Stack.Screen name="StackTopTabComponent" component={StackTopTabComponent} options={{headerShown:false}}/>
          <Stack.Screen name="StackPostScreen" component={Post} options={{title:'Post',headerStyle:{elevation:0}}}/>
        </Stack.Navigator>)}
    </NavigationContainer>
    </AuthContext.Provider>
    );

}
export default App;
