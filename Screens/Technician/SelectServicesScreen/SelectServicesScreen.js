import React, {useState, useEffect} from 'react';
import {Button, Text, View} from 'native-base';
import SelectMultiple from 'react-native-select-multiple'
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
        navigator.push('OrdersScreen', {selectedServices, services})
    };

    return <Layout>
        <View>
            <Text style={styles.header}>Choose service types</Text>
            <SelectMultiple
                items={services.map(service => (service.type))}
                onSelectionsChange={(items) => selectServices(items.map(item => item.value))}
                selectedItems={selectedServices}
            />
        </View>
        <Button style={styles.button} block onPress={() => submit()} disabled={!selectedServices.length}><Text>Submit</Text></Button>
    </Layout>

}
