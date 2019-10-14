import React, {useState, useEffect} from 'react';
import Navigator from 'react-native-easy-router';
import AuthScreen from './Screens/AuthScreen/AuthScreen';
import ReceiverScreen from './Screens/ReceiverScreen/ReceiverScreen';
import TechnicianScreen from './Screens/TechnicianScreen/TechnicianScreen';
import BarCodeScanScreen from './Screens/BarCodeScanScreen/BarCodeScanScreen';
import CarInfoScreen from './Screens/CarInfoScreen/CarInfoScreen';
import AddDamageScreen from './Screens/CarInfoScreen/AddDamageScreen';
import DamageScreen from './Screens/CarInfoScreen/DamageScreen';
import ServicesScreen from './Screens/CarInfoScreen/ServicesScreen';
import SubmitReceiverInfoScreen from './Screens/SubmitReceiverInfoScreen/SubmitReceiverInfoScreen';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
    const [ready, setReady] = useState(false);
    async function waitFonts() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        setReady(true);
    }
    useEffect(()=> {
        waitFonts();
    }, []);

    if (!ready) {
        return <AppLoading />;
    }
  return (
      <Navigator screens={{
          AuthScreen,
          ReceiverScreen,
          TechnicianScreen,
          BarCodeScanScreen,
          CarInfoScreen,
          DamageScreen,
          AddDamageScreen,
          ServicesScreen,
          SubmitReceiverInfoScreen
      }} initialStack='AuthScreen' />
  );
}
