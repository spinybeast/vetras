import React, {useState, useEffect} from 'react';
import { Button, Text, Spinner, View } from 'native-base';
import styles from './SubmitReceiverInfoScreenStyle';
import Layout from '../../Theme/Layout';
import { saveReceiverInfo } from '../../Helpers/api';

export default function SubmitReceiverInfoScreen({navigator, carInfo, damages, services, photos}) {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        setLoading(true);
        saveReceiverInfo(carInfo, damages, services, photos).then(() => {
            setLoading(false);
            setSuccess(true);
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    return <Layout>
        {
            loading ? <Spinner/> :
                <View>
                    <Text>{success ? 'Data saved' : 'Error'}</Text>
                </View>
        }
    </Layout>
}
