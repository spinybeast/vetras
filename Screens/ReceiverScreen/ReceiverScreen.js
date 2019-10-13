import React from 'react';
import { Button, Text } from 'native-base';
import styles from './ReceiverScreenStyle';
import Layout from '../../Theme/Layout';

export default function ReceiverScreen({navigator}) {
    return <Layout>
        <Button block onPress={() => navigator.push('BarCodeScanScreen')}><Text>Acceptance</Text></Button>
        </Layout>
}
