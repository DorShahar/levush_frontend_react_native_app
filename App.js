import React from 'react';
import AppNavigator from "./src/navigation/AppNavigator"
import { NavigationContainer } from '@react-navigation/native';
import Amplify from 'aws-amplify';
import awsmobile from "./aws-exports";



Amplify.configure(awsmobile);


const App = () => {

    return (
        <NavigationContainer>
            <AppNavigator/>
        </NavigationContainer>
    );
}

export default App;
