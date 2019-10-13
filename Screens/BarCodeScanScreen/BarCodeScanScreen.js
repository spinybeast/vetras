import React, { useState } from 'react';
import { Form, Item, Input, Label, Button, Text, Icon } from 'native-base';
import styles from './BarCodeScanScreenStyle';
import ExpoBarCodeScanner from '../../Components/ExpoBarCodeScanner';
import useForm from 'react-hook-form';
import Layout from '../../Theme/Layout';

export default function BarCodeScanScreen({navigator}) {
    const [showScanner, setShowScanner] = useState(false);
    const {register, setValue, handleSubmit, getValues} = useForm();
    const onSubmit = data => navigator.push('CarInfoScreen', {VIN: data.VIN});
    const values = getValues();
    return <Layout withPadding={!showScanner}>
        {
            showScanner ?
                <ExpoBarCodeScanner navigator={navigator}/> :
                <Form>
                    <Item floatingLabel style={styles.margin}>
                        <Label>Enter VIN code</Label>
                        <Input ref={register({name: 'VIN'})}
                               onChangeText={text => setValue('VIN', text)}/>
                    </Item>
                    <Button disabled={!values.VIN} style={styles.margin} block onPress={handleSubmit(onSubmit)}>
                        <Text>Submit</Text>
                    </Button>
                    <Button iconLeft light block onPress={() => setShowScanner(true)}>
                        <Icon name={'md-barcode'}/>
                        <Text>Scan</Text>
                    </Button>
                </Form>
        }
    </Layout>;
}
