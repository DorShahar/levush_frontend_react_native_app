import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen'


/* This navigator  will be accessible only when we are correctly authenticated. */

const StackMainNavigator = createStackNavigator();

const MainNavigator = () => {
    return (
        <StackMainNavigator.Navigator>
            <StackMainNavigator.Screen name="MainScreen" component={MainScreen} />
        </StackMainNavigator.Navigator>
    );
};

export default MainNavigator;
