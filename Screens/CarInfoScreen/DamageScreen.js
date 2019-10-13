import React, { useState } from 'react';
import { Alert } from 'react-native';
import { Text, View, Button, Form, Picker, Item, Label, Segment } from 'native-base';
import ImageMapper from 'react-native-image-mapper';
import { imageSource, MAPPING, WINDSHIELD_ID } from '../../Helpers/image';
import styles from './CarInfoScreenStyle';
import Layout from '../../Theme/Layout';

export default function DamageScreen({navigator, carInfo}) {
    const [selectedArea, setSelectedArea] = useState(null);
    const [selectedDamages, setSelectedDamages] = useState({});
    const [damage, setDamage] = useState(null);
    const onSelectArea = (item) => {
        setSelectedArea(item);
        setSelectedDamages({...selectedDamages, [item.id]: {}})
    };
    const onSelectDamage = (name, value) => {
        setSelectedDamages({
            ...selectedDamages,
            [selectedArea.id]: {...selectedDamages[selectedArea.id], [name]: value}
        });
    };

    const getSelectedValue = (name) => {
        return selectedDamages[selectedArea.id] ? selectedDamages[selectedArea.id][name] : null;
    };

    const onSubmit = () => {
        Alert.alert(
            'Are you finish?',
            'You may proceed or select another damaged area',
            [
                {text: 'Add area', onPress: () => console.log('Ask me later pressed')},
                {
                    text: 'Proceed',
                    onPress: () => navigator.push('ServicesScreen', {carInfo: carInfo, damages: selectedDamages})
                },
            ],
            {cancelable: false},
        );
    };
    return <Layout>
        <Text style={styles.header}>Select damaged areas</Text>
        <ImageMapper
            imgHeight={300}
            imgWidth={273}
            imgSource={imageSource}
            imgMap={MAPPING}
            onPress={(item, idx, event) => onSelectArea(item, idx, event)}
            containerStyle={styles.image}
            multiselect={true}
        />
        {selectedArea &&
        <View>
            <Text style={styles.header}>Damaged area: {selectedArea.id}</Text>
            <Segment style={{backgroundColor: '#cccccc'}}>
                <Button active={damage === 'dent'} first onPress={() => setDamage('dent')}>
                    <Text>Dent</Text>
                </Button>
                <Button active={damage === 'scratch'} last onPress={() => setDamage('scratch')}>
                    <Text>Scratch</Text>
                </Button>
            </Segment>
            <Form>
                {
                    damage === 'dent' &&
                    <Item picker>
                        <Label>Dent</Label>
                        <Picker
                            mode="dropdown"
                            selectedValue={getSelectedValue('dent')}
                            onValueChange={value => onSelectDamage('dent', value)}>
                            <Picker.Item label="---" value={null}/>
                            <Picker.Item label="Paintless" value="paintless"/>
                            <Picker.Item label="Convensional" value="convensional"/>
                            <Picker.Item label="Replace" value="replace"/>
                        </Picker>
                    </Item>
                }
                {
                    damage === 'scratch' &&
                    <Item picker>
                        <Label>Scratch</Label>
                        <Picker
                            mode="dropdown"
                            selectedValue={getSelectedValue('scratch')}
                            onValueChange={value => onSelectDamage('scratch', value)}>
                            <Picker.Item label="---" value={null}/>
                            <Picker.Item label="Small" value="small"/>
                            <Picker.Item label="Large" value="large"/>
                        </Picker>
                    </Item>
                }
                {
                    selectedArea.id === WINDSHIELD_ID &&
                    <Item picker>
                        <Label>Windshield damage</Label>
                        <Picker
                            mode="dropdown"
                            selectedValue={getSelectedValue('windshield')}
                            onValueChange={value => onSelectDamage('windshield', value)}>
                            <Picker.Item label="---" value={null}/>
                            <Picker.Item label="Chip" value="chip"/>
                            <Picker.Item label="Crack" value="crack"/>
                            <Picker.Item label="Shattered" value="shattered"/>
                        </Picker>
                    </Item>
                }
                <Button block onPress={onSubmit}><Text>Submit</Text></Button>
            </Form>
        </View>
        }
    </Layout>

}
