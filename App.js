
import React from 'react';
import {View,Image, ActivityIndicator} from 'react-native';
import { navigationRef } from './Components/RootNavigation';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Components/screens/Login';
import Signup from './Components/screens/Signup';
import MainComponent from './Components/MainComponent';
import StackProfile from './Components/screens/StackProfile';
import StackComment from './Components/screens/StackComment';
import { AuthContext } from './Components/AuthContext';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Stack =createStackNavigator();

function App(){
  
  const [isloading,setIsLoading]=React.useState(true);
  const [token,setToken]=React.useState('false');

  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
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
    } catch (e) {
      console.log(e);
    }
  }
  React.useEffect(()=>{
    getToken();
  },[])
  const context=React.useMemo(()=>({
    login:(username)=>{
      console.log('activated');
      storeToken('true');
      

    },
    singup:()=>{
      setToken(true);
    },
    logout:()=>{
      removeToken();
    }
  }));

  
     return(
      <AuthContext.Provider value={context}>
      <NavigationContainer ref={navigationRef}>
      {token==null ?
      <Stack.Navigator>
         <Stack.Screen options={{headerTitle:()=><Image source={{uri:'https://i.ibb.co/SKqmC0Y/maskable-icon.png'}} style={{width:50,resizeMode: 'contain', height:56,borderRadius:15}}/>}} name="Login" component={Login}/>
         <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Navigator>
      :(
      <Stack.Navigator>
          <Stack.Screen name="MainComponent" component={MainComponent} options={{headerShown:false}}/>
          <Stack.Screen name="StackProfile" component={StackProfile} options={{headerShown:false}}/>
          <Stack.Screen name="StackComment" component={StackComment} />
        </Stack.Navigator>)}
    </NavigationContainer>
    </AuthContext.Provider>
    );

}
export default App;
