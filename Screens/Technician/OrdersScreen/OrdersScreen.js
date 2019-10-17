import React, { useState, useEffect } from 'react';
import { Body, Button, View, Left, List, ListItem, Spinner, Right, Text, Thumbnail } from 'native-base';
import { ScrollView } from 'react-native';
import { fetchOrdersByServices, fetchVehicles } from "../../../Helpers/api";
import Layout from "../../../Theme/Layout";
import styles from './OrdersScreenStyle';
import {MINIO_URL, STATUS_IN_SERVICE} from '../../../constants';

export default function OrdersScreen({navigator, selectedServices = [], services}) {
    const [loading, setLoading] = useState(false);
    const [orders, setOrders] = useState([]);

    const prepareOrders = (orders, vehicles) => {
        orders.map(order => {
            order.vehicle = vehicles.filter(vehicle => vehicle._id === order.vehicleRecord)[0];
            order.service = services.filter(service => service.type === order.serviceType)[0];
            return order;
        });
        return orders.filter(order => order.vehicle.status === STATUS_IN_SERVICE);
    };

    useEffect(() => {
        setLoading(true);
        fetchOrdersByServices(selectedServices).then(orders => {
            let ordersCopy = [...orders];
            fetchVehicles(orders.map(order => order.vehicleRecord)).then(vehicles => {
                setOrders(prepareOrders(ordersCopy, vehicles));
                setLoading(false);
            }).catch(() => setLoading(false))
        }).catch(() => setLoading(false));
    }, []);

    return <Layout>
        {
            loading ? <Spinner/> :
                <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
                    {
                        orders.length === 0 ?
                            <View style={styles.flexRow}><Text>All tasks complete. Good job!</Text></View> :
                            <List>
                                {
                                    orders.map((order, key) => {
                                        const vehicle = order.vehicle || {};
                                        if (!order.serviceType) {
                                            return null;
                                        }
                                        return <ListItem thumbnail key={key}>
                                            <Left>
                                                <Thumbnail square
                                                           source={{uri: vehicle.photos && vehicle.photos.length > 0 ? MINIO_URL + '/images/' + vehicle.photos[0] : null}}/>
                                            </Left>
                                            <Body>
                                                <Text>{vehicle.licensePlate}</Text>
                                                <Text note numberOfLines={1}>
                                                    {vehicle.manufacturer} {vehicle.model}
                                                </Text>
                                            </Body>
                                            <Right>
                                                <Button transparent key={order.serviceType}
                                                        onPress={() => navigator.push('JobScreen', {order, selectedServices})}>
                                                    <Text>{order.serviceType}</Text>
                                                </Button>
                                            </Right>
                                        </ListItem>
                                    })
                                }
                            </List>

                    }
                </ScrollView>
        }
    </Layout>

}
