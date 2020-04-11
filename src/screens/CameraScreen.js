import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import Consts from "../components/Consts"
import { useNavigation } from '@react-navigation/native';
import {PredictByClarifaiApparelModel, PredictByWorkFlow} from "../components/Predict"

//TODO: get picture as component

const CameraScreen = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [cachedImageUri,setCachedImageUri] = useState(null);
    const navigation = useNavigation();


    useEffect(() => {
        (async  ()=> {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
            console.log('CameraScreen, useEffect, status:',status);
        })();
    },[hasPermission]);

    if (hasPermission == null) return <View/>
    if (hasPermission === false) return <Text>No access to camera</Text>

    const takePicture = async () => {
      let assetsObj = null;
      if(cameraRef){
          const {uri , base64} = await cameraRef.takePictureAsync({base64: true});
          setCachedImageUri(uri);


          const cachedAsset = await MediaLibrary.createAssetAsync(uri);
          const myAlbum = await MediaLibrary.getAlbumAsync(Consts.ALBUM_NAME)

          if(!myAlbum){
              let albumCreated = await MediaLibrary.createAlbumAsync(Consts.ALBUM_NAME,cachedAsset,false);
              if(albumCreated) {
                  assetsObj = await MediaLibrary.getAssetsAsync({ album: albumCreated.id});
              } else {
                  console.log('Error: album not created');
              }
          } else {
              let isAssetAdded =  await MediaLibrary.addAssetsToAlbumAsync([cachedAsset], myAlbum, false);
              if(isAssetAdded){
                  assetsObj = await MediaLibrary.getAssetsAsync({album:myAlbum});
              }
          }

            const lastAssetsSaved = assetsObj.assets[assetsObj.totalCount - 1];

          console.log(' --- takePicture function ---');
          console.log('cachedAsset : ',cachedAsset);
          console.log('#items : ',assetsObj.totalCount);
          console.log('@ last asset : ',lastAssetsSaved);

          {<PredictByWorkFlow image={base64}/> }
              { <PredictByClarifaiApparelModel image={uri}/> }

          navigation.navigate('imageCapturedScreen',{currentAsset: lastAssetsSaved});
      }
    };


    return (
        <View style={styles.fill}>
            <Camera style={styles.fill}
                    type={Camera.Constants.Type.back}
                    ref={ref => {setCameraRef(ref)}}>

                <TouchableOpacity style={styles.btnContainer }
                                  onPress={() => takePicture()}>
                    <View style={styles.outerBtn}>
                        <View style={styles.innerBtn}>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={styles.imageContainer}>
                    {cachedImageUri ?
                     <Image source={{uri : cachedImageUri}}
                            style={styles.imageContainer}/> : <Image source={{uri: null}}/>
                    }
                </View>
            </Camera>
        </View>
    );
};


const styles = StyleSheet.create({
    fill : {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
    },
    btnContainer: {
        alignSelf: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 15

    },
    innerBtn : {
        borderWidth: 2,
        borderRadius: 50 ,
        borderColor: 'white',
        height: 50,
        width:50,
        backgroundColor: 'white'
    },
    outerBtn : {
        borderWidth: 2,
        borderRadius: 50 ,
        borderColor: 'white',
        height: 60,
        width:60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    imageContainer : {
        alignSelf: 'flex-end',
        width: 110,
        height: 100,
        marginRight: 5,
        marginBottom: 15
    },
 });

export default CameraScreen;

