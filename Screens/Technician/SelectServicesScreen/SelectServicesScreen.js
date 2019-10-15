import React, {useState, useEffect} from 'react';
import {Button, Text} from 'native-base';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import {getServices} from "../../../Helpers/api";
import Layout from "../../../Theme/Layout";
import styles from './SelectServicesScreenStyle';

export default function SelectServicesScreen({navigator}) {
    const [selectedServices, selectServices] = useState([]);
    const [services, setServices] = useState([]);
    useEffect(() => {
        getServices().then(services => setServices(services));
    }, []);

    const submit = () => {
        navigator.push('OrdersScreen', {services: selectedServices})
    };

    return <Layout>
        <SectionedMultiSelect
            items={services.map((service, key) => ({id: key, name: service.type}))}
            uniqueKey="id"
            selectText="Choose service types"
            onSelectedItemsChange={(items) => selectServices(items)}
            selectedItems={selectedServices}
        />
        <Button style={styles.button} block onPress={() => submit()} disabled={!selectedServices.length}><Text>Submit</Text></Button>
    </Layout>

}
