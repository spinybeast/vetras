import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Camera, {
    Aspect,
    CaptureQuality,
    TorchMode,
} from 'react-native-openalpr'

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

    onPlateRecognized = ({ plate, confidence }) => {
        this.setState({
            plate,
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Camera
                    style={styles.preview}
                    aspect={Aspect.fill}
                    captureQuality={CaptureQuality.medium}
                    country="us"
                    onPlateRecognized={this.onPlateRecognized}
                    plateOutlineColor="#ff0000"
                    showPlateOutline
                    torchMode={TorchMode.off}
                    touchToFocus
                />
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{this.state.plate}</Text>
                </View>
            </View>
        )
    }
}
