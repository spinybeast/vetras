import React, {useState, useEffect} from 'react';
import {Button, Text} from 'native-base';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {fetchServices} from "../../../Helpers/api";
import Layout from "../../../Theme/Layout";
import styles from './SelectServicesScreenStyle';

export default function SelectServicesScreen({navigator}) {
    const [selectedServices, selectServices] = useState([]);
    const [services, setServices] = useState([]);
    useEffect(() => {
        fetchServices().then(services => setServices(services));
    }, []);

    const submit = () => {
        const selected = selectedServices.map(item => {
            return services.filter(service => service.type === item)[0];
        });
        navigator.push('OrdersScreen', {selectedServices: selected})
    };

    return <Layout>
        <SectionedMultiSelect
            items={services.map(service => ({id: service.type, name: service.type}))}
            uniqueKey="id"
            selectText="Choose service types"
            onSelectedItemsChange={(items) => selectServices(items)}
            selectedItems={selectedServices}
        />
        <Button style={styles.button} block onPress={() => submit()} disabled={!selectedServices.length}><Text>Submit</Text></Button>
    </Layout>

}
