import React from 'react';
import { Auth } from 'aws-amplify';
import {StyleSheet ,Button } from "react-native";

//TODO: change to touchable opacity button to edit UI


const LoginButton = props => {
    if (!props.title || !props.provider) return
    const {title} = props,
        {provider} = props;

    return (
        <Button
            style={[styles.loginBtn, ]}
            title={title}
            onPress={() => Auth.federatedSignIn({ provider: provider })}
        />
    );
}


const styles = StyleSheet.create({
   loginBtn:{
       fontSize: 32,
       padding: 10,
       flex:1,
   },
});


export default LoginButton;