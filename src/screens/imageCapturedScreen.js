import React from "react"
import {View,StyleSheet} from "react-native"
import DisplayPicture from "../components/DisplayPicture"

const imageCapturedScreen = ({route}) => {

    const {currentAsset} = route.params;

    console.log('-- imageCapturedScreen --');
    console.log('route.params',route.params);

    console.log('currentAsset', currentAsset);

    return (
        <View>
            <DisplayPicture currentAsset={currentAsset}/>
        </View>
    );
};

export default imageCapturedScreen;
