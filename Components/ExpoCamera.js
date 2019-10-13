import React from 'react';
import { Text, View, TouchableOpacity, CameraRoll } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

export default class ExpoCamera extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back,
    };

    async componentDidMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        const { status2 } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        this.setState({ hasCameraPermission: (status === 'granted')});
    }

    snap = async () => {
        if (this.camera) {
            await this.camera.takePictureAsync().then((capturephoto)=>{
                CameraRoll.saveToCameraRoll(capturephoto.uri);
                this.props.onPhoto();
            });
        }
    };

    render() {
        const { hasCameraPermission } = this.state;
        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera ref={ref => {
                        this.camera = ref;
                    }} style={{ flex: 1 }} type={this.state.type}>
                        <View
                            style={{
                                flex: 1,
                                backgroundColor: 'transparent',
                                flexDirection: 'row',
                            }}>
                            <TouchableOpacity
                                style={{
                                    flex: 1,
                                    alignSelf: 'flex-end',
                                    alignItems: 'center',
                                }}
                                onPress={() => this.snap()}>
                                <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Snap </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}
