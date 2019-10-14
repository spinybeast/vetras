import React, {useState} from 'react';
import {View, Text, Switch, Form, Button, Icon, ListItem, Left, Body, Right, FooterTab} from 'native-base';
import {StyleSheet, Image} from 'react-native';
import styles from './CarInfoScreenStyle';
import ExpoCamera from '../../Components/ExpoCamera';
import Layout from '../../Theme/Layout';

export default function ServicesScreen({navigator, carInfo, damages}) {
    const [services, setServices] = useState({wash: false, pressure: false, service: false});
    const [showCamera, setShowCamera] = useState(false);
    const [photos, setPhotos] = useState([]);
    const footer = <FooterTab>
            <Button full onPress={() => navigator.push('SubmitReceiverInfoScreen', {carInfo, damages, services, photos})}>
                <Text>Submit</Text>
            </Button>
        </FooterTab>;

    if (showCamera) {
        return <ExpoCamera onPhoto={(photo) => {
            setShowCamera(false);
            setPhotos([...photos, photo.uri]);
        }} style={StyleSheet.absoluteFillObject}/>
    }
    return <Layout footer={footer}>
        <View>
            <Text style={styles.header}>Select manipulations</Text>
            <Form>
                <ListItem icon>
                    <Left>
                        <Button>
                            <Icon active name="water"/>
                        </Button>
                    </Left>
                    <Body>
                        <Text>Wash</Text>
                    </Body>
                    <Right>
                        <Switch value={services.wash} onValueChange={value => setServices({...services, wash: value})}/>
                    </Right>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button>
                            <Icon active name="clock"/>
                        </Button>
                    </Left>
                    <Body>
                        <Text>Tire pressure</Text>
                    </Body>
                    <Right>
                        <Switch value={services.pressure}
                                onValueChange={value => setServices({...services, pressure: value})}/>
                    </Right>
                </ListItem>
                <ListItem icon>
                    <Left>
                        <Button>
                            <Icon active name="md-settings"/>
                        </Button>
                    </Left>
                    <Body>
                        <Text>Service</Text>
                    </Body>
                    <Right>
                        <Switch value={services.service}
                                onValueChange={value => setServices({...services, service: value})}/>
                    </Right>
                </ListItem>
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
