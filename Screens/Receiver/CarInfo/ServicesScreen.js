import React, {useState, useEffect} from 'react';
import {View, Text, Switch, Form, Button, Icon, ListItem, Left, Body, Right, FooterTab} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import styles from './CarInfoScreenStyle';
import ExpoCamera from '../../../Components/ExpoCamera';
import Layout from '../../../Theme/Layout';
import {fetchServices} from "../../../Helpers/api";

export default function ServicesScreen({navigator, carInfo, damages, startTime}) {
    const [carInfoCopy, setCarInfoCopy] = useState({...carInfo});
    const [services, setServices] = useState([]);
    const [showCamera, setShowCamera] = useState(false);
    const [photos, setPhotos] = useState([]);
    const footer = <FooterTab>
            <Button full onPress={() => navigator.push('SubmitReceiverInfoScreen', {carInfo: carInfoCopy, damages, photos, startTime})}>
                <Text>Submit</Text>
            </Button>
        </FooterTab>;

    useEffect(() => {
        fetchServices().then(services => setServices(services));
    }, []);

    const getIconName = (service) => {
        const icons = {
            "Wash": "water",
            "Tire Pressure": "clock"
        };
        return icons[service] || "md-settings";
    };

    const setService = (key, value) => {
        let services = carInfoCopy.servicesOrdered || [];
        const index = services.indexOf(key);
        if (!!~index && value === false) {
            services.splice(index, 1);
        } else {
            services.push(key);
        }
        setCarInfoCopy({...carInfoCopy, servicesOrdered: services});
    };

    const hasService = (service) => {
        let services = carInfoCopy.servicesOrdered || [];
        return !!~services.indexOf(service);
    };

    if (showCamera) {
        return <ExpoCamera onCloseCamera={() => setShowCamera(false)}
                           onPhoto={(photo) => {
                               setShowCamera(false);
                               setPhotos([...photos, photo.uri]);
                           }} style={StyleSheet.absoluteFillObject}/>
    }
    return <Layout footer={footer}>
        <View>
            <Text style={styles.header}>Choose service types</Text>
            <Form>
                {
                    services.map((service, key) =>
                        <ListItem key={key} icon>
                            <Left>
                                <Button>
                                    <Icon active name={getIconName(service.type)}/>
                                </Button>
                            </Left>
                            <Body>
                                <Text>{service.type}</Text>
                            </Body>
                            <Right>
                                <Switch value={hasService(service.type)} onValueChange={value => setService(service.type, value)}/>
                            </Right>
                        </ListItem>
                    )
                }
                <ListItem>
                    <Body>
                        <Text>Add some vehicle photos</Text>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => setShowCamera(true)}><Icon name="camera"/></Button>
                    </Right>
                </ListItem>
            </Form>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {photos.map((image, key) => <Image key={key} style={{width: 75, height: 75, margin: 10, flexBasis: '25%'}}
                                                   source={{uri: image}}/>)}
            </View>
        </View>
    </Layout>;
}
