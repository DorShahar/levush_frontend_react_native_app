import React, { useState, useEffect } from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image ,CameraRoll} from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import {render} from "react-native-web"

const ALBUM_NAME = 'LEVUSH_APP';

// TODO: image is touchable


const CameraScreen = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [cachedImageUri,setCachedImageUri] = useState(null);
    const [allAssets,setAllAssets] = useState([]);

    useEffect(() => {
        (async  ()=> {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    },[]);

    if (hasPermission == null) return <View/>
    if (hasPermission === false) return <Text>No access to camera</Text>

    const takePicture = async () =>{
      let assets = null;
      if(cameraRef){
          const {uri} = await cameraRef.takePictureAsync();
          setCachedImageUri(uri);

          const cachedAsset = await MediaLibrary.createAssetAsync(uri);
          const myAlbum = await MediaLibrary.getAlbumAsync(ALBUM_NAME)

          if(!myAlbum){
              let albumCreated = await MediaLibrary.createAlbumAsync(ALBUM_NAME,cachedAsset,false);
              if(albumCreated) {
                  assets = await MediaLibrary.getAssetsAsync({ album: albumCreated.id});
                  setAllAssets(assets);

              } else {
              }
          } else {
              let addedAsset =  MediaLibrary.addAssetsToAlbumAsync([cachedAsset], myAlbum, true);
              if(addedAsset){
                  assets = await MediaLibrary.getAssetsAsync({album:myAlbum});
                  setAllAssets(assets);

              }
          }
      }
    };

    return (
        <View style={styles.fill}>
            <Camera style={styles.fill}
                    type={type}
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

