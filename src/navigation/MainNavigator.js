import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from '../screens/MainScreen'
import CameraScreen from "../screens/CameraScreen"
import imageCapturedScreen from "../screens/imageCapturedScreen"

/* This navigator  will be accessible only when we are correctly authenticated. */

const StackMainNavigator = createStackNavigator();

const MainNavigator = () => {
    return (
        <StackMainNavigator.Navigator>
            <StackMainNavigator.Screen name="MainScreen" component={MainScreen} />
            <StackMainNavigator.Screen name="CameraScreen" component={CameraScreen}/>
            <StackMainNavigator.Screen name="imageCapturedScreen" component={imageCapturedScreen}/>
        </StackMainNavigator.Navigator>
    );
};

export default MainNavigator;
