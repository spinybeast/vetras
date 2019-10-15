import React, {useState, useEffect} from 'react';
import Navigator from 'react-native-easy-router';
import AuthScreen from './Screens/AuthScreen/AuthScreen';
import SelectServicesScreen from './Screens/Technician/SelectServicesScreen/SelectServicesScreen';
import OrdersScreen from './Screens/Technician/OrdersScreen/OrdersScreen';
import JobScreen from './Screens/Technician/JobScreen/JobScreen';
import BarCodeScanScreen from './Screens/Receiver/BarCodeScanScreen/BarCodeScanScreen';
import CarInfoScreen from './Screens/Receiver/CarInfo/CarInfoScreen';
import AddDamageScreen from './Screens/Receiver/CarInfo/AddDamageScreen';
import DamageScreen from './Screens/Receiver/CarInfo/DamageScreen';
import ServicesScreen from './Screens/Receiver/CarInfo/ServicesScreen';
import SubmitReceiverInfoScreen from './Screens/Receiver/SubmitReceiverInfoScreen/SubmitReceiverInfoScreen';
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
          SelectServicesScreen,
          OrdersScreen,
          JobScreen,
          BarCodeScanScreen,
          CarInfoScreen,
          DamageScreen,
          AddDamageScreen,
          ServicesScreen,
          SubmitReceiverInfoScreen
      }} initialStack='AuthScreen' />
  );
}
