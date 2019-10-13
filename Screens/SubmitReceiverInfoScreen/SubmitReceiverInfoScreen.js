import React from 'react';
import { Button, Text } from 'native-base';
import styles from './SubmitReceiverInfoScreenStyle';
import Layout from '../../Theme/Layout';

export default function SubmitReceiverInfoScreen({navigator, carInfo, damages, services, photos}) {
    return <Layout>
        <Text>carInfo: {JSON.stringify(carInfo, null, 4)}</Text>
        <Text>damages: {JSON.stringify(damages, null, 4)}</Text>
        <Text>services: {JSON.stringify(services, null, 4)}</Text>
        <Text>photos: {JSON.stringify(photos, null, 4)}</Text>
    </Layout>
}
