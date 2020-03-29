import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from "expo-image-picker"

const CameraScreen = (props) => {
    const [hasPermission, setHasPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back);

    useEffect(() => {
        (async  ()=> {
            const {status} = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    },[]);

    if (hasPermission == null) return <View/>
    if (hasPermission === false) return <Text>No access to camera</Text>

    const takePicture = async () =>{
      if(cameraRef){
          let filePhoto = await cameraRef.takePictureAsync();
          console.log('cameraScreen, takePicture (pictureTaken), photo ',filePhoto);
      }
    };

    const pickImage = async () => {
      let image = await ImagePicker.launchImageLibraryAsync({mediaTypes : ImagePicker.MediaTypeOptions.Images});
      console.log('cameraScreen, pickPicture,  image ',image);
    };

    return (
        <View style={styles.fill}>
            <Camera style={[styles.fill]}
                    type={type}
                    ref={ref => {setCameraRef(ref)}}>
                <TouchableOpacity style={styles.btnContainer}
                                  onPress={() => takePicture()}>
                    <View style={styles.outerBtn}>
                        <View style={styles.innerBtn}>
                        </View>
                    </View>
                </TouchableOpacity>
            </Camera>
        </View>
    );
};

const styles = StyleSheet.create({
    fill : {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end'
    },
    btnContainer: {
        alignSelf: 'center',
        alignItems: 'center',
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
 });

export default CameraScreen;
