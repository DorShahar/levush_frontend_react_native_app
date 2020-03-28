import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';

const StackNavigator = createStackNavigator();

const AppNavigator = () =>{
  return(
      <StackNavigator.Navigator>
          <StackNavigator.Screen name="AuthNavigator" component={AuthNavigator} options={{headerShown : false}} />
          <StackNavigator.Screen name="MainNavigator" component={MainNavigator} options={{headerShown : false}} />
      </StackNavigator.Navigator>
  );
};

export default AppNavigator;

