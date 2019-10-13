import React, { useState, useEffect } from 'react';
import { View, Text, Switch, Form, Item, Label, Button, Icon, ListItem, Left, Body, Right } from 'native-base';
import { StyleSheet, CameraRoll, Image } from 'react-native';
import styles from './CarInfoScreenStyle';
import ExpoCamera from '../../Components/ExpoCamera';
import Layout from '../../Theme/Layout';

export default function ServicesScreen({navigator, carInfo, damages}) {
    const [services, setServices] = useState({wash: false, pressure: false, service: false});
    const [showCamera, setShowCamera] = useState(false);
    const [photoTaken, setPhotoTaken] = useState(false);
    const [images, setImages] = useState([]);
    useEffect(() => {
        if (photoTaken) {
            CameraRoll.getPhotos({first: 5}).then(data =>{
                    const assets = data.edges;
                    setImages(assets.map((asset) => asset.node.image));
                }
            );
        }
    }, [photoTaken]);
    return <Layout withPadding={!showCamera}>
        {showCamera ? <ExpoCamera onPhoto={() => {
            setPhotoTaken(true); setShowCamera(false);
            }} style={StyleSheet.absoluteFillObject}/> :
            <View>
                <Text style={styles.header}>Select manipulations</Text>
                <Form>
                    <ListItem icon>
                        <Left>
                            <Button>
                                <Icon active name="water" />
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
                                <Icon active name="clock" />
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
                                <Icon active name="md-settings" />
                            </Button>
                        </Left>
                        <Body>
                            <Text>Service</Text>
                        </Body>
                        <Right>
                            <Switch value={services.service} onValueChange={value => setServices({...services, service: value})}/>
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
                <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap'}}>
                    {images.map((image, key) => <Image key={key} style={{width: 100, height: 100, flexBasis: '25%'}} source={{ uri: image.uri }} />) }
                </View>
            </View>
        }
    </Layout>;
}
