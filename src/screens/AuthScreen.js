import LoginButton from "../components/LoginBtn";
import {View,StyleSheet} from 'react-native';
import React from 'react';


const AuthScreen = () => {
        return(
            <View style={styles.authScreen} >
                <View style={styles.loginBtnView}>
                    <LoginButton title='Login with Google'
                                 provider='Google'/>
                </View>

                <View style={[styles.loginBtnView, styles.setPosition ]}>
                    <LoginButton title='Login with Facebook'
                                 provider='Facebook'/>
                </View>
            </View>
        );
};

export default AuthScreen;

const styles = StyleSheet.create({
     authScreen: {
         flex: 1,
         alignItems: 'center',
         justifyContent: 'space-around'
     },
    loginBtnView: {
         margin: 10,
         flex:1,
         justifyContent: 'center'
    },
    setPosition: {
         position: 'relative',
         bottom: 50
    }

});