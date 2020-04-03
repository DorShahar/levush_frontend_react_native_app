import React from "react"
import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native"
import * as MediaLibrary from "expo-media-library"
import Consts from "./Consts"
import { useNavigation } from '@react-navigation/native';


const DisplayPicture = ({currentAsset}) => {

    const navigation = useNavigation();
    const uri = currentAsset.uri;

    console.log('-- DisplayPicture component -- ');
    console.log(' > currentAsset uri : ', uri);
    console.log(' > currentAsset object: ', currentAsset);


    const removePicture = async () => {
        console.log(' ! DisplayPicture, removePicture !');
        const isRemoved = await MediaLibrary.removeAssetsFromAlbumAsync(currentAsset,Consts.ALBUM_NAME)
        console.log(' ! did image been removed? ',isRemoved);

        isRemoved && navigation.goBack();
    }

    if(uri){
        return (
            <View style={styles.fill}>
                <TouchableOpacity style={styles.topBtn} onPress={ ()=> removePicture()}>
                    <Text> delete image </Text>
                </TouchableOpacity>

                <View style={[styles.imageViewWrapper]}>
                    <Image source={{uri: uri}}
                           style={styles.imageContainer}/>
                </View>
            </View>
        );
    }
};

const styles = StyleSheet.create({
     topBtn : {
         alignItems: 'center',
         margin: 20,
         flex: 1,
     },
    text: {
        fontSize: 18,
        padding: 10,
    },
    fill: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
         width: 250,
         height: 350,

     },
    imageViewWrapper: {
        flex: 4,
        backgroundColor: 'yellow',
    }
});

export default DisplayPicture;