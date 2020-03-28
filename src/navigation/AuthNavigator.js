import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import AuthScreen from '../screens/AuthScreen'
import AuthLoadingScreen from "../screens/AuthLoadingScreen"

const StackAuthNavigator = createStackNavigator();

const AuthNavigator = () => {
    return(
        <StackAuthNavigator.Navigator>
            <StackAuthNavigator.Screen name ="AuthLoadingScreen" component={AuthLoadingScreen}/>
            <StackAuthNavigator.Screen name="AuthScreen" component={AuthScreen} headerShown={false}/>
        </StackAuthNavigator.Navigator>
    );
};

export default AuthNavigator;