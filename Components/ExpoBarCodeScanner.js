import React, { Fragment } from 'react';
import {StyleSheet} from 'react-native';
import { View, Button, Icon, Text, Spinner } from 'native-base';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import styles from '../Screens/Receiver/BarCodeScanScreen/BarCodeScanScreenStyle';

export default class ExpoBarCodeScanner extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        flashMode: Camera.Constants.FlashMode.off,
        VIN: null
    };

    async componentDidMount() {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({hasCameraPermission: status === 'granted'});
    }

    handleBarCodeScanned = ({data}) => {
        this.setState({scanned: true, VIN: data});
    };

    toggleFlash = () => {
        this.setState({flashMode: this.isFlash() ? Camera.Constants.FlashMode.off : Camera.Constants.FlashMode.torch});
    };

    isFlash = () => {
        return this.state.flashMode === Camera.Constants.FlashMode.torch
    };

    render() {
        const {hasCameraPermission, scanned} = this.state;
        if (hasCameraPermission === null) {
            return <Spinner/>;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <Fragment>
                    <Camera style={StyleSheet.absoluteFillObject}
                            flashMode={this.state.flashMode}
                            barCodeScannerSettings={{
                                barCodeTypes: [
                                    BarCodeScanner.Constants.BarCodeType.code39
                                ],
                            }}
                            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}>
                    </Camera>
                    <Button iconLeft transparent style={styles.topLeft} onPress={this.toggleFlash}>
                        <Icon color={'black'} name={this.isFlash() ? 'flash' : 'flash-off'}/>
                    </Button>
                    <Button iconLeft transparent style={styles.topRight} onPress={this.props.onCloseCamera}>
                        <Icon name="close"/>
                    </Button>
                    {scanned && (
                        <View style={styles.bottom}>
                            {
                                this.state.VIN &&
                                <View style={styles.flexRow}>
                                    <Text style={[styles.label, styles.margin]}>VIN: {this.state.VIN}</Text>
                                </View>
                            }
                            <View style={styles.flexRow}>
                                <View style={[styles.button, styles.half]}>
                                    <Button style={styles.buttonLeft} light onPress={() => this.setState({scanned: false, VIN: null})}>
                                        <Icon name={'md-barcode'}/>
                                        <Text>Scan Again</Text>
                                    </Button>
                                </View>
                                <View style={[styles.button, styles.half]}>
                                    <Button style={styles.buttonRight} light onPress={() => this.props.navigator.push('CarInfoScreen', {VIN: this.state.VIN})}>
                                        <Text>Go forward</Text>
                                        <Icon name={'arrow-forward'}/>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    )}
                </Fragment>
            );
        }
    }
}
