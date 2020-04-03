import React from 'react';
import {Button, View, Text, FlatList} from 'react-native';
import { Auth } from 'aws-amplify';

const MainScreen = (props) =>{

    return(
            <View>
                <Text>Main Screen</Text>
                <Button title={'To Camera'}
                        onPress={() => {props.navigation.navigate('CameraScreen')}}>
                </Button>

                <Button title={'Sign Out'}
                        onPress={()=> Auth.signOut()}>
                </Button>
            </View>
        );
}

export default MainScreen;