import React, { useState, useEffect } from 'react';
import { Text, View, Button, Form, Picker, Item, Label } from 'native-base';
import ImageMapper from 'react-native-image-mapper';
import { imageSource, MAPPING, isGlass } from '../../../Helpers/image';
import styles from './CarInfoScreenStyle';
import Layout from '../../../Theme/Layout';
import { Image, StyleSheet, ScrollView } from "react-native";
import ExpoCamera from "../../../Components/ExpoCamera";

export default function AddDamageScreen({navigator, carInfo, startTime, damages = {}, currentDamageKey = null}) {
    const [damagesCopy, setDamagesCopy] = useState({...damages});
    const [selectedArea, setSelectedArea] = useState(null);
    const [currentDamage, setCurrentDamage] = useState({});
    const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {
        if (currentDamageKey !== null) {
            const currentDamage = damages[currentDamageKey];
            onSelectArea(currentDamage.area);
            setCurrentDamage(currentDamage);
        }
    }, [currentDamageKey]);

    const onSelectArea = (item) => {
        setSelectedArea(item);
    };

    function makeId(editedDamage) {
        let type = 'scratch-or-dent';
        if (editedDamage.type === 'glass') {
            type = editedDamage.type
        }
        return `${selectedArea}-${type}`;
    }

    const editDamage = (fields) => {
        const editedDamage = {
            ...currentDamage,
            ...fields,
            area: selectedArea
        };
        setDamagesCopy({...damagesCopy, [makeId(editedDamage)]: editedDamage});
        setCurrentDamage(editedDamage);
    };

    const getDamageValue = (type) => {
        return currentDamage && currentDamage.type === type ? currentDamage.value : null;
    };

    const onSubmit = () => {
        navigator.push('DamageScreen', {carInfo, startTime, damages: damagesCopy})
    };

    const currentDamageIs = (type) => {
        return currentDamage && currentDamage.type === type;
    };

    if (showCamera) {
        return <ExpoCamera onCloseCamera={() => setShowCamera(false)} onPhoto={(photo) => {
            setShowCamera(false);
            editDamage({photo: photo.uri});
        }} style={StyleSheet.absoluteFillObject}/>
    }

    return <Layout>
            <ScrollView>
                <Text style={styles.header}>Select damaged areas</Text>
                <ImageMapper
                    imgHeight={300}
                    imgWidth={273}
                    imgSource={imageSource}
                    imgMap={MAPPING}
                    onPress={(item) => onSelectArea(item.id)}
                    containerStyle={styles.image}
                    multiselect={true}
                />
                {selectedArea &&
                <View>
                    <Text style={styles.header}>Damaged area: {selectedArea}</Text>
                    {
                        !isGlass(selectedArea) &&
                        <View style={styles.flexRow}>
                            <Button light={!currentDamageIs('dent')} primary={currentDamageIs('dent')} style={styles.button}
                                    onPress={() => editDamage({type: 'dent', value: null})}>
                                <Text>Dent</Text>
                            </Button>
                            <Button light={!currentDamageIs('scratch')} primary={currentDamageIs('scratch')}
                                    style={styles.button}
                                    onPress={() => editDamage({type: 'scratch', value: null})}>
                                <Text>Scratch</Text>
                            </Button>
                        </View>
                    }
                    <Form>
                        {
                            !isGlass(selectedArea) && currentDamageIs('dent') &&
                            <Item picker>
                                <Label>Dent</Label>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={getDamageValue('dent')}
                                    onValueChange={value => editDamage({type: 'dent', value})}>
                                    <Picker.Item label="---" value={null}/>
                                    <Picker.Item label="Paintless" value="paintless"/>
                                    <Picker.Item label="Convensional" value="convensional"/>
                                    <Picker.Item label="Replace" value="replace"/>
                                </Picker>
                            </Item>
                        }
                        {
                            !isGlass(selectedArea) && currentDamageIs('scratch') &&
                            <Item picker>
                                <Label>Scratch</Label>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={getDamageValue('scratch')}
                                    onValueChange={value => editDamage({type: 'scratch', value})}>
                                    <Picker.Item label="---" value={null}/>
                                    <Picker.Item label="Small" value="small"/>
                                    <Picker.Item label="Large" value="large"/>
                                </Picker>
                            </Item>
                        }
                        {
                            isGlass(selectedArea) &&
                            <Item picker>
                                <Label>Glass damage</Label>
                                <Picker
                                    mode="dropdown"
                                    selectedValue={getDamageValue('glass')}
                                    onValueChange={value => editDamage({type: 'glass', value})}>
                                    <Picker.Item label="---" value={null}/>
                                    <Picker.Item label="Chip" value="chip"/>
                                    <Picker.Item label="Crack" value="crack"/>
                                    <Picker.Item label="Shattered" value="shattered"/>
                                </Picker>
                            </Item>
                        }
                        {
                            currentDamage.photo ?
                                <View style={styles.photo}>
                                    <Image style={styles.damagePhoto} onPress={() => setShowCamera(true)}
                                           source={{uri: currentDamage.photo}}/>
                                    <Button transparent style={{paddingTop: 30}} onPress={() => setShowCamera(true)}>
                                        <Text>Remake</Text>
                                    </Button>
                                </View> :
                                <Button style={styles.margin} block onPress={() => setShowCamera(true)}>
                                    <Text>Add Photo</Text>
                                </Button>
                        }
                        <Button disabled={!currentDamage.value} block onPress={onSubmit}><Text>Submit</Text></Button>
                    </Form>
                </View>
                }
            </ScrollView>
    </Layout>

}
