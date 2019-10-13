import React from 'react';
import { Button, Text } from 'native-base';
import styles from './AuthScreenStyle';
import Layout from '../../Theme/Layout';

export default function ReceiverScreen({navigator}) {
    return <Layout>
        <Text style={[styles.margin, styles.label]}>Who are you?</Text>
        <Button style={styles.margin} block onPress={() => navigator.push('ReceiverScreen')}><Text> Receiver </Text></Button>
        <Button block onPress={() => navigator.push('TechnicianScreen')}><Text> Technician </Text></Button>
    </Layout>;
}
