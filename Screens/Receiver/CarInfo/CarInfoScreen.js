import React, {useEffect, useState, Fragment} from 'react';
import {Spinner, Form, Item, Input, Label, Text, Button, Icon, View, Picker} from 'native-base';
import styles from './CarInfoScreenStyle';
import {decodeVIN, fetchPrincipals} from '../../../Helpers/api';
import Slider from 'react-native-slider';
import Layout from '../../../Theme/Layout';
import {Keyboard} from 'react-native';

export default function CarInfoScreen({navigator, VIN, startTime}) {
    const [carInfo, setCarInfo] = useState({fuel: 1, VIN});
    const [loading, setLoading] = useState(false);
    const [principals, setPrincipals] = useState([]);
    const [showRest, setShowRest] = useState(true);

    const onSubmit = () => {
        Keyboard.dismiss();
        navigator.push('DamageScreen', {carInfo, startTime});
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 5000);
        decodeVIN(VIN).then(info => {
            info = info || {};
            setCarInfo({
                ...carInfo,
                manufacturer: info.manuName || '',
                model: info.modelName || '',
                type: info.typeName || ''
            });
            setLoading(false);
        }).catch(() => setLoading(false));
        fetchPrincipals().then(principals => {
            setPrincipals(principals);
            setCarInfo({...carInfo, principal: principals[0].name})
        })
    }, []);

    const isValid = () => {
        return carInfo.manufacturer && carInfo.manufacturer.length > 0 &&
            carInfo.model && carInfo.model.length > 0 &&
            carInfo.licensePlate && carInfo.licensePlate.length > 0;
    };

    return <Layout>
        <View>
            <Text style={styles.header}>VIN: {VIN}</Text>
            {
                loading ?
                    <Spinner/> :
                    <Form>
                        <Item floatingLabel>
                            <Label>Manufacturer</Label>
                            <Input onChangeText={manufacturer => setCarInfo({...carInfo, manufacturer})}
                                   value={carInfo.manufacturer}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Model</Label>
                            <Input onChangeText={model => setCarInfo({...carInfo, model})}
                                   value={carInfo.model}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Type</Label>
                            <Input onChangeText={type => setCarInfo({...carInfo, type})}
                                   value={carInfo.type}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>License plate</Label>
                            <Input onChangeText={licensePlate => setCarInfo({...carInfo, licensePlate})}/>
                            {/*<Icon active name='camera'/>*/}
                        </Item>
                        <Item floatingLabel>
                            <Label>Mileage (km)</Label>
                            <Input onChangeText={mileage => setCarInfo({...carInfo, mileage: parseInt(mileage)})}
                                   keyboardType="numeric"/>
                        </Item>
                        {
                            showRest ?
                            <Fragment>
                                <Item picker style={{marginLeft: 15, marginTop: 20}}>
                                    <Label>Principal</Label>
                                    <Picker
                                        mode="dropdown"
                                        selectedValue={carInfo.principal}
                                        onValueChange={principal => setCarInfo({...carInfo, principal})}>
                                        {
                                            principals.map((principal, key) =>
                                                <Picker.Item key={key} label={principal.name} value={principal.name}/>)
                                        }
                                    </Picker>
                                </Item>
                                <Item last>
                                    <Label>Fuel ({carInfo.fuel})</Label>
                                    <View style={styles.slider}>
                                        <Slider
                                            value={carInfo.fuel}
                                            minimumValue={1}
                                            maximumValue={8}
                                            step={1}
                                            onValueChange={fuel => setCarInfo({...carInfo, fuel})}
                                        />
                                    </View>
                                </Item>
                                <Button disabled={!isValid()} block onPress={() => onSubmit()}>
                                    <Text>Submit</Text>
                                </Button>
                            </Fragment> : null
                        }
                    </Form>

            }
        </View>
    </Layout>
}
