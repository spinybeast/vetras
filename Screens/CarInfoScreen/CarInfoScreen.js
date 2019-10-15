import React, { useEffect, useState } from 'react';
import { Spinner, Form, Item, Input, Label, Text, Button, View, Icon } from 'native-base';
import useForm from 'react-hook-form'
import styles from './CarInfoScreenStyle';
import { decodeVIN, search } from '../../Helpers/api';
import Slider from 'react-native-slider';
import Layout from '../../Theme/Layout';
import { Keyboard } from 'react-native';

export default function CarInfoScreen({navigator, VIN = 'TSMLYE21S00511109'}) {
    const [carInfo, setCarInfo] = useState({});
    const [loading, setLoading] = useState(false);
    const [fuel, setFuel] = useState(1);
    const {register, setValue, handleSubmit, formState, getValues} = useForm();
    const onSubmit = data => {
        Keyboard.dismiss();
        navigator.push('DamageScreen', {carInfo: {...data, fuel, VIN}});
    };

    useEffect(() => {
        search();
        setLoading(true);
        setTimeout(() => setLoading(false), 5000);
        decodeVIN(VIN).then(info => {
            info = info || {};
            setCarInfo(info);
            setValue('manufacturer', info.manuName);
            setValue('model', info.modelName);
            setValue('type', info.typeName);
            setLoading(false);
        }).catch(e => setLoading(false));
    }, []);

    const isValid = () => {
        if (!formState.dirty) {
            return false;
        }
        const values = getValues();
        return !values.make || !values.model;
    };
    return <Layout>
        <Text style={styles.header}>VIN: {VIN}</Text>
        <View>
            {
                loading ?
                    <Spinner/> :
                    <Form>
                        <Item floatingLabel>
                            <Label>Manufacturer</Label>
                            <Input ref={register({name: 'manufacturer'}, {required: true})}
                                   onChangeText={text => setValue('manufacturer', text)}
                                   value={carInfo.manuName}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Model</Label>
                            <Input ref={register({name: 'model'})}
                                   onChangeText={text => setValue('model', text)}
                                   value={carInfo.modelName}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Type</Label>
                            <Input ref={register({name: 'type'})}
                                   onChangeText={text => setValue('type', text)}
                                   value={carInfo.typeName}/>
                        </Item>
                        <Item floatingLabel>
                            <Label>Licence plate</Label>
                                <Input ref={register({name: 'licencePlate'})}
                                       onChangeText={text => setValue('licencePlate', text)}/>
                                {/*<Icon active name='camera'/>*/}
                        </Item>
                        <Item floatingLabel>
                            <Label>Mileage (km)</Label>
                            <Input ref={register({name: 'mileage'})}
                                   onChangeText={text => setValue('mileage', text)}
                                   keyboardType="numeric"/>
                        </Item>
                        <Item last>
                            <Label>Fuel ({fuel})</Label>
                            <View style={styles.slider}>
                                <Slider
                                    value={fuel}
                                    minimumValue={1}
                                    maximumValue={8}
                                    step={1}
                                    onValueChange={value => setFuel(value)}
                                />
                            </View>
                        </Item>
                        <Button disabled={!isValid()} block onPress={handleSubmit(onSubmit)}>
                            <Text>Submit</Text>
                        </Button>
                    </Form>
            }
        </View>
    </Layout>
}
