
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
const Stack =createStackNavigator();
  

function App(){
  const isauthenicated=true;
  const [isloading,setIsLoading]=React.useState(true);
  const [token,setToken]=React.useState(null);

  if(token!=null){
    return(
      <NavigationContainer>
      <Stack.Navigator>
         <Stack.Screen options={{headerTitle:()=><Image source={{uri:'https://i.ibb.co/SKqmC0Y/maskable-icon.png'}} style={{width:50,resizeMode: 'contain', height:56,borderRadius:15}}/>}} name="Login" component={Login}/>
         <Stack.Screen name="Signup" component={Signup}/>
      </Stack.Navigator>
    </NavigationContainer>
    );
  }else{
    return(
      <NavigationContainer ref={navigationRef}>
        
        <Stack.Navigator>
          <Stack.Screen name="MainComponent" component={MainComponent} options={{headerShown:false}}/>
          <Stack.Screen name="StackProfile" component={StackProfile} options={{headerShown:false}}/>
          <Stack.Screen name="StackComment" component={StackComment} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  }

}
export default App;
