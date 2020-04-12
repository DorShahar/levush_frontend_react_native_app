import React from "react"
import {View,StyleSheet} from "react-native"
import DisplayPicture from "../components/DisplayPicture"
import * as Predict from "../components/Predict"


const imageCapturedScreen = ({route}) => {

    const {currentAsset , base64} = route.params;

    console.log('-- imageCapturedScreen --');

    Predict.predictByClarifaiApparelModel(base64);

    return (
        <View>
            <DisplayPicture currentAsset={currentAsset}/>
        </View>
    );
};


export default imageCapturedScreen;
