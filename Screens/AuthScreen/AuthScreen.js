import React, {useState} from 'react';
import { Button, Form, Input, Item, Label, Text } from 'native-base';
import useForm from 'react-hook-form'
import styles from './AuthScreenStyle';
import Layout from '../../Theme/Layout';
import {Image, Dimensions, Keyboard} from "react-native";
import {login} from '../../Helpers/api';

const logo = require('../../assets/logo.png');
const { width } = Dimensions.get('window');

export default function ReceiverScreen({navigator}) {
    const {register, setValue, handleSubmit, getValues} = useForm();
    const [error, setError] = useState(null);
    const onSubmit = data => {
        Keyboard.dismiss();
        setError(null);
        login(data).then(result => {
            if (result.success) {
                navigator.push(result.role === 'receiver' ? 'BarCodeScanScreen': 'SelectServicesScreen');
            } else {
                setError('Incorrect login or password')
            }
        });

    };
    const isValid = () => {
        const values = getValues();
        return values.login && values.password;
    };
    return <Layout>
        <Image source={logo} style={{marginBottom: 40, width: width - 40}} resizeMode="contain"/>
        <Text style={styles.header}>Login</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        <Form>
            <Item floatingLabel>
                <Label>Login</Label>
                <Input ref={register({name: 'login'}, {required: true})}
                       onChangeText={text => setValue('login', text)}
                       />
            </Item>
            <Item floatingLabel style={styles.margin}>
                <Label>Password</Label>
                <Input secureTextEntry ref={register({name: 'password'}, {required: true})}
                       onChangeText={text => setValue('password', text)}
                />
            </Item>
            <Button disabled={!isValid()} block onPress={handleSubmit(onSubmit)}>
                <Text>Submit</Text>
            </Button>
        </Form>
    </Layout>;
}
