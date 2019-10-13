import React from 'react';
import {CameraRoll} from 'react-native';
import { View, Button, Icon, Text } from 'native-base';
import * as Permissions from 'expo-permissions';
import {Camera} from 'expo-camera';
import styles from "../Screens/BarCodeScanScreen/BarCodeScanScreenStyle";

export default class ExpoCamera extends React.Component {
    state = {
        hasCameraPermission: null,
        flashMode: Camera.Constants.FlashMode.off,
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        const {status2} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({hasCameraPermission: (status === 'granted')});
    }

    snap = async () => {
        if (this.camera) {
            const photo = await this.camera.takePictureAsync();
            this.props.onPhoto(photo);
        }
    };
    toggleFlash = () => {
        this.setState({flashMode: this.isFlash() ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch});
    };
    isFlash = () => {
        return this.state.flashMode === Camera.Constants.FlashMode.torch
    };
    render() {
        const {hasCameraPermission} = this.state;
        if (hasCameraPermission === null) {
            return <View/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{flex: 1}}>
                    <Camera ref={ref => {
                        this.camera = ref;
                    }} style={{flex: 1}} flashMode={this.state.flashMode}>
                        <View style={[styles.bottom, {left: '50%', marginLeft:-27, bottom: 15}]}>
                            <Button rounded
                                style={{
                                    width: 54,
                                    height: 54,
                                }}
                                onPress={() => this.snap()}>
                                <Icon name="camera" />
                            </Button>
                        </View>
                    </Camera>
                    <Button iconLeft transparent style={styles.top} onPress={this.toggleFlash}>
                        <Icon color={'black'} name={this.isFlash() ? 'flash' : 'flash-off'}/>
                    </Button>
                </View>
            );
        }
    }
}
