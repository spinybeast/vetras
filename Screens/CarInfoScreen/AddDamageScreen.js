import React, { useState, useEffect } from 'react';
import { Text, View, Button, Form, Picker, Item, Label, Segment } from 'native-base';
import ImageMapper from 'react-native-image-mapper';
import { imageSource, MAPPING, isGlass } from '../../Helpers/image';
import styles from './CarInfoScreenStyle';
import Layout from '../../Theme/Layout';
import {CameraRoll, Image, StyleSheet} from "react-native";
import ExpoCamera from "../../Components/ExpoCamera";

export default function AddDamageScreen({navigator, carInfo, damages = {}, currentDamage}) {
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedDamages, setSelectedDamages] = useState({});
    const [damageType, setDamageType] = useState(null);
    const [showCamera, setShowCamera] = useState(false);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        if(currentDamage) {
            onSelectArea(currentDamage);
            setDamageType(Object.keys(damages[currentDamage])[0])
        }
    }, [currentDamage]);
    useEffect(() => {
        if(photo) {
            setDamageField('photo', photo.uri);
        }
    }, [photo]);
    const onSelectArea = (item) => {
        setSelectedArea(item);
        setSelectedDamages({...selectedDamages, [item]: damages[item] || {}})
    };
    const setDamageField = (name, value) => {
        setSelectedDamages({
            ...selectedDamages,
            [selectedArea]: {...selectedDamages[selectedArea], [name]: value}
        });
    };

    const getSelectedValue = (name) => {
        return selectedDamages[selectedArea] ? selectedDamages[selectedArea][name] : null;
    };

    const onSubmit = () => {
        navigator.push('DamageScreen', {carInfo, damages: {...damages, ...selectedDamages}})
    };

    const damagesSelected = () => {
        return selectedDamages[selectedArea] && (selectedDamages[selectedArea].dent || selectedDamages[selectedArea].scratch || selectedDamages[selectedArea].windshield);
    };
    if (showCamera) {
        return <ExpoCamera onPhoto={(photo) => {
            console.log(photo);
            setShowCamera(false);
            setPhoto(photo.uri);
        }} style={StyleSheet.absoluteFillObject}/>
    }
    return <Layout>
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
            {!isGlass(selectedArea) &&
            <Segment style={styles.transparent}>
                <Button style={styles.grey} active={damageType === 'dent'} first onPress={() => setDamageType('dent')}>
                    <Text>Dent</Text>
                </Button>
                <Button style={styles.grey} active={damageType === 'scratch'} last onPress={() => setDamageType('scratch')}>
                    <Text>Scratch</Text>
                </Button>
            </Segment>}
            <Form>
                {
                    !isGlass(selectedArea) && damageType === 'dent' &&
                    <Item picker>
                        <Label>Dent</Label>
                        <Picker
                            mode="dropdown"
                            selectedValue={getSelectedValue('dent')}
                            onValueChange={value => setDamageField('dent', value)}>
                            <Picker.Item label="---" value={null}/>
                            <Picker.Item label="Paintless" value="paintless"/>
                            <Picker.Item label="Convensional" value="convensional"/>
                            <Picker.Item label="Replace" value="replace"/>
                        </Picker>
                    </Item>
                }
                {
                    !isGlass(selectedArea) && damageType === 'scratch' &&
                    <Item picker>
                        <Label>Scratch</Label>
                        <Picker
                            mode="dropdown"
                            selectedValue={getSelectedValue('scratch')}
                            onValueChange={value => setDamageField('scratch', value)}>
                            <Picker.Item label="---" value={null}/>
                            <Picker.Item label="Small" value="small"/>
                            <Picker.Item label="Large" value="large"/>
                        </Picker>
                    </Item>
                }
                {isGlass(selectedArea) &&
                    <Item picker>
                        <Label>Glass damage</Label>
                        <Picker
                            mode="dropdown"
                            selectedValue={getSelectedValue('windshield')}
                            onValueChange={value => setDamageField('windshield', value)}>
                            <Picker.Item label="---" value={null}/>
                            <Picker.Item label="Chip" value="chip"/>
                            <Picker.Item label="Crack" value="crack"/>
                            <Picker.Item label="Shattered" value="shattered"/>
                        </Picker>
                    </Item>
                }
                {photo && <Image style={styles.damagePhoto} source={{uri: photo.uri}}/>}
                <Button style={styles.margin} block onPress={() => setShowCamera(true)}>
                    <Text>{photo ? 'Remake photo' : 'Add Photo'}</Text>
                </Button>
                <Button disabled={!damagesSelected()} block onPress={onSubmit}><Text>Submit</Text></Button>
            </Form>
        </View>
        }
    </Layout>

}
