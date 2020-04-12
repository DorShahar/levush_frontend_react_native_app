import React, { useReducer, useState, useEffect } from 'react'
import { Auth, Hub } from 'aws-amplify'
import {View,ActivityIndicator,StyleSheet} from 'react-native';


const AuthLoadingScreen = (props) => {
     useEffect(()=> {
        checkIfUserAuthenticated();
        Hub.listen('auth',async (data) => {
            try{
                console.log('Hub.listen : ' ,data.payload.event);

                const event = data.payload.event;
                switch (event) {
                    case 'signIn':
                        props.navigation.navigate('MainNavigator');
                        break;
                    case 'signOut':
                        props.navigation.navigate('AuthScreen');
                        break;
                    default: break;
                }
            } catch (e) {
                console.log('!!! Error in AuthLoadingScreen : Hub.listen',e);
            }
        });
    },[]);

    const checkIfUserAuthenticated = async () => {
        try {
            let userSession = await Auth.currentSession();
            props.navigation.navigate( userSession ? 'MainNavigator' : 'AuthScreen');
        } catch (e) {
            props.navigation.navigate('AuthScreen');
        }
    };

    return(
        <View style={styles.activityIndicatorContainer}>
            <ActivityIndicator size="large" color="0000ff"/>
        </View>
    );
};

const styles = StyleSheet.create({
     activityIndicatorContainer : {
         flex: 1,
         justifyContent: "center"
     }
 });

export default AuthLoadingScreen;

