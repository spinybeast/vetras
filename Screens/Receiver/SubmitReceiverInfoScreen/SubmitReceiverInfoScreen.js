import React, {useState, useEffect} from 'react';
import { Text, Spinner, View } from 'native-base';
import styles from './SubmitReceiverInfoScreenStyle';
import Layout from '../../../Theme/Layout';
import { saveReceiverInfo } from '../../../Helpers/api';

export default function SubmitReceiverInfoScreen({navigator, carInfo, damages, photos, startTime}) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        setLoading(true);
        saveReceiverInfo(carInfo, damages, photos, startTime).then(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => navigator.push('BarCodeScanScreen'), 1000);
        }).catch((e) => {
            console.log('ERROR: ', e);
            setLoading(false);
        });
    }, []);

    return <Layout>
        {
            loading ? <Spinner/> :
                <View style={styles.flexRow}>
                    <Text>{success ? 'Acceptance Complete.' : 'Error'}</Text>
                </View>
        }
    </Layout>
}
