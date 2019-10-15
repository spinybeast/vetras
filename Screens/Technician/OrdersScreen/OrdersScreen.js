import React, {useState, useEffect} from 'react';
import {Body, Button,View, Left, List, ListItem, Right, Text, Thumbnail} from 'native-base';
import {getOrders, getVehicles} from "../../../Helpers/api";
import Layout from "../../../Theme/Layout";
import styles from './OrdersScreenStyle';

export default function OrdersScreen({navigator, selectedServices}) {
    const [vehicles, setVehicles] = useState([]);
    useEffect(() => {
        getOrders(selectedServices).then(orders => {
            getVehicles(orders.map(order => order.vehicleRecord)).then(vehicles => setVehicles(vehicles))
        });
    }, []);

    return <Layout>
        {
            vehicles.length === 0 ? <Text>All tasks complete. Good job!</Text> :
                <List>
                    {
                        vehicles.map((vehicle, key) =>
                            <ListItem thumbnail key={key}>
                                <Left>
                                    <Thumbnail square source={{uri: vehicle.photos ? vehicle.photos[0] : null}}/>
                                </Left>
                                <Body>
                                    <Text>{vehicle.licencePlate}</Text>
                                    <Text note numberOfLines={1}>
                                        {vehicle.manufacturer} {vehicle.model}
                                    </Text>
                                    <View style={styles.flexRow}>
                                        {
                                            vehicle.servicesOrdered.map(service =>
                                                <Button key={service} style={styles.button}
                                                        onPress={() => navigator.push('JobScreen', {type: service, carInfo: vehicle})}>
                                                    <Text>{service}</Text>
                                                </Button>
                                            )
                                        }
                                    </View>
                                </Body>
                            </ListItem>
                        )
                    }
                </List>

        }
    </Layout>

}
