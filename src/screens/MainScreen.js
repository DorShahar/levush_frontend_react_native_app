import React from 'react';
import {Button, View, Text} from 'react-native';
import { Auth } from 'aws-amplify';

const MainScreen = () =>{
    return(
            <View>
                <Text>Main Screen</Text>
                <Button title={'Sign Out'}
                        onPress={()=> Auth.signOut()}>
                </Button>
            </View>
        );
}

export default MainScreen;