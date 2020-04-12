import React from "react"
import {Image, Text, TouchableOpacity, View, StyleSheet} from "react-native"
import * as MediaLibrary from "expo-media-library"
import Consts from "./Consts"
import { useNavigation } from '@react-navigation/native';

//TODO: edit UI
//TODO: make sure the asset was removed from dir


const DisplayPicture = ({currentAsset}) => {

    const navigation = useNavigation();
    const uri = currentAsset.uri;

    // console.log('-- DisplayPicture component -- ');
    // console.log(' > currentAsset uri : ', uri);
    // console.log(' > currentAsset object: ', currentAsset);

    const removePicture = async () => {
        console.log(' ! DisplayPicture, removePicture !');
        const isRemoved = await MediaLibrary.removeAssetsFromAlbumAsync([currentAsset],Consts.ALBUM_NAME)
        console.log(' ! did image been removed? ',isRemoved);

        isRemoved && navigation.goBack();
    }

    if(uri){
        return (
            <View style={styles.fill}>
                <View styles={styles.btnWrapper}>
                    <TouchableOpacity style={styles.topBtn} onPress={ ()=> removePicture()}>
                        <Text style={styles.text}> Delete image </Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.imageViewWrapper}>
                    <Image source={{uri: uri.toString()}}
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
         backgroundColor: 'grey',
     },
    text: {
        fontSize: 18,
        padding: 20,
        textTransform: 'capitalize',
    },
    btnWrapper :{
         alignItems: 'center',
    },
    fill: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
         width: 250,
         height: 350,

     },
    imageViewWrapper: {
        marginTop: 20,
        backgroundColor: 'yellow',
        flex: 1
    }
});

export default DisplayPicture;