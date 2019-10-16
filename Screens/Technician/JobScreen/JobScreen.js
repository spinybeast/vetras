import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'native-base';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Layout from "../../../Theme/Layout";
import styles from './JobScreenStyle';
import { completeJob } from '../../../Helpers/api';

export default function JobScreen({navigator, order}) {
    const {vehicle, service} = order;
    const [subtypes, selectSubtypes] = useState([]);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => setStartTime(new Date()), []);

    const complete = () => {
        completeJob(order._id, subtypes, startTime).then(() => navigator.push('SelectServicesScreen'));
    };

    return <Layout>
        <Text style={styles.header}>{order.serviceType}</Text>
        <Text style={styles.subheader}>License Plate: {vehicle.licencePlate}</Text>
        <View>
            {
                service.subtypesAvailable ?
                <SectionedMultiSelect
                    items={service.subtypesAvailable.map(type => ({id: type, name: type}))}
                    uniqueKey="id"
                    selectText="Choose service subtypes"
                    onSelectedItemsChange={(items) => selectSubtypes(items)}
                    selectedItems={subtypes}
                /> : null
            }
        </View>
        <Button block style={styles.button} onPress={complete}><Text>Completed</Text></Button>
    </Layout>

}
