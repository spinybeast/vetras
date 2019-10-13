import React, { Component } from 'react'
import {CameraRoll, StyleSheet, Text, View} from 'react-native'

import RNTextDetector from "react-native-text-detector";
import ExpoCamera from "./ExpoCamera";


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    textContainer: {
        position: 'absolute',
        top: 100,
        left: 50,
    },
    text: {
        textAlign: 'center',
        fontSize: 20,
    },
})

export default class LicensePlateScan extends React.Component {
    state = {
        plate: 'Scan a plate',
    }

    detectText = async (uri) => {
        console.log(uri);
        try {
            const visionResp = await RNTextDetector.detectFromUri(uri);
            console.log('visionResp', visionResp);
        } catch (e) {
            console.warn(e);
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <ExpoCamera onPhoto={() => {
                    CameraRoll.getPhotos({first: 1}).then(data => {
                            const asset = data.edges[0];
                            this.detectText(asset.node.image.uri).then(text => console.log(text));
                        }
                    );
                }} style={StyleSheet.absoluteFillObject}/>
            </View>
        )
    }
}