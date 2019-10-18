import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'native-base';
import SelectMultiple from 'react-native-select-multiple'
import Layout from '../../../Theme/Layout';
import styles from './JobScreenStyle';
import { completeJob } from '../../../Helpers/api';
import {ScrollView} from "react-native";

export default function JobScreen({navigator, order, selectedServices, services}) {
    const {vehicle, service} = order;
    const [subtypes, selectSubtypes] = useState([]);
    const [startTime, setStartTime] = useState(null);

    useEffect(() => setStartTime(new Date()), []);

    const complete = () => {
        completeJob(order, subtypes, startTime).then(() => navigator.push('OrdersScreen', {selectedServices, services}));
    };

    return <Layout>
        <ScrollView>
        <Text style={[styles.header, styles.button]}>{order.serviceType}</Text>
        <Text style={styles.subheader}>License Plate: {vehicle.licensePlate}</Text>
        <View>
            {
                service.hasOwnProperty('subtypesAvailable') && service.subtypesAvailable.length ?
                    <SelectMultiple
                        items={service.subtypesAvailable.map(type => ({label: type, value: type}))}
                        onSelectionsChange={(items) => selectSubtypes(items.map(item => item.value))}
                        selectedItems={subtypes}
                    /> : null
            }
        </View>
        <Button block style={styles.button} onPress={complete}><Text>Completed</Text></Button>
        </ScrollView>
    </Layout>

}
