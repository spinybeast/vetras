import React, {useState, useEffect} from 'react';
import {Text, View, Button, Form, Picker, Item, Label} from 'native-base';
import ImageMapper from 'react-native-image-mapper';
import {imageSource, DAMAGES_MAPPING, isGlass} from '../../../Helpers/damageAreas';
import styles from './CarInfoScreenStyle';
import Layout from '../../../Theme/Layout';
import {Image, StyleSheet} from "react-native";
import ExpoCamera from "../../../Components/ExpoCamera";

export default function AddDamageScreen({navigator, carInfo, startTime, damages = [], currentDamageKey = null}) {
    const damagesCopy = [...damages];
    const [selectedArea, setSelectedArea] = useState(null);
    const [currentDamage, setCurrentDamage] = useState({});
    const [showCamera, setShowCamera] = useState(false);

    useEffect(() => {
        if (currentDamageKey !== null) {
            const currentDamage = damages.filter(damage => damage.id === currentDamageKey)[0];
            onSelectArea(currentDamage.part);
            setCurrentDamage(currentDamage);
        }
    }, [currentDamageKey]);

    const onSelectArea = (item) => {
        setSelectedArea(item);
    };

    function makeId(editedDamage) {
        return `${selectedArea}-${editedDamage.type}-${(new Date().getTime())}`;
    }

    const editDamage = (fields) => {
        const editedDamage = {
            ...currentDamage,
            ...fields,
            part: selectedArea
        };
        setCurrentDamage(editedDamage);
    };

    const getDamageValue = (type) => {
        return currentDamage && currentDamage.type === type ? currentDamage.degree : null;
    };

    const onSubmit = () => {
        if (currentDamageKey) {
            damagesCopy.splice(currentDamageKey, 1, currentDamage);
        } else {
            damagesCopy.push({...currentDamage, id: makeId(currentDamage)});
        }
        navigator.push('DamageScreen', {carInfo, startTime, damages: damagesCopy})
    };

    const currentDamageIs = (type) => {
        return currentDamage && currentDamage.type === type;
    };

    if (showCamera) {
        return <ExpoCamera onCloseCamera={() => setShowCamera(false)} onPhoto={(photo) => {
            setShowCamera(false);
            editDamage({photos: [...currentDamage.photos || [], photo.uri]});
        }} style={StyleSheet.absoluteFillObject}/>
    }

    return <Layout>
        <View>
            <Text style={styles.header}>Select damaged parts</Text>
            <ImageMapper
                imgHeight={300}
                imgWidth={273}
                imgSource={imageSource}
                imgMap={DAMAGES_MAPPING}
                onPress={(item) => onSelectArea(item.name)}
                containerStyle={styles.image}
                multiselect={true}
            />
            {selectedArea &&
            <View>
                <Text style={styles.header}>Damaged part: {selectedArea}</Text>
                {
                    !isGlass(selectedArea) &&
                    <View style={styles.flexRow}>
                        <Button light={!currentDamageIs('dent')} primary={currentDamageIs('dent')} style={styles.button}
                                onPress={() => editDamage({type: 'dent', degree: null})}>
                            <Text>Dent</Text>
                        </Button>
                        <Button light={!currentDamageIs('scratch')} primary={currentDamageIs('scratch')}
                                style={styles.button}
                                onPress={() => editDamage({type: 'scratch', degree: null})}>
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
                                onValueChange={degree => editDamage({type: 'dent', degree})}>
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
                                onValueChange={degree => editDamage({type: 'scratch', degree})}>
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
                                onValueChange={degree => editDamage({type: 'glass', degree})}>
                                <Picker.Item label="---" value={null}/>
                                <Picker.Item label="Chip" value="chip"/>
                                <Picker.Item label="Crack" value="crack"/>
                                <Picker.Item label="Shattered" value="shattered"/>
                            </Picker>
                        </Item>
                    }
                    {
                        currentDamage.photos && currentDamage.photos.length &&
                        <View>
                            {
                                currentDamage.photos.map((photo, key) =>
                                    <View key={key} style={styles.photo}>
                                        <Image style={styles.damagePhoto} source={{uri: photo}}/>
                                        <Button transparent style={{paddingTop: 30}}
                                                onPress={() => setShowCamera(true)}>
                                            <Text>Remake</Text>
                                        </Button>
                                    </View>
                                )
                            }
                        </View>
                    }
                    <Button style={styles.margin} block onPress={() => setShowCamera(true)}>
                        <Text>Add Photo</Text>
                    </Button>
                    <Button disabled={!currentDamage.degree} block onPress={onSubmit}><Text>Submit</Text></Button>
                </Form>
            </View>
            }
        </View>
    </Layout>

}
