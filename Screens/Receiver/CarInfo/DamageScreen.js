import React, { useState } from 'react';
import { Text, View, Button, Icon, List, ListItem, Thumbnail, Left, Body, Right, FooterTab } from 'native-base';
import styles from './CarInfoScreenStyle';
import Layout from '../../../Theme/Layout';

export default function DamageScreen({navigator, carInfo, damages = {}, startTime}) {
    const [damagesCopy, setDamagesCopy] = useState({...damages});

    let footer = null;
    if (Object.keys(damagesCopy).length > 0) {
        footer = <FooterTab>
            <Button full onPress={() => navigator.push('ServicesScreen', {carInfo, startTime, damages: damagesCopy})}>
                <Text>Submit</Text>
            </Button>
        </FooterTab>
    }

    const deleteDamage = (key) => {
        delete damagesCopy[key];
        setDamagesCopy({...damagesCopy});
    };

    return <Layout centeredContent={false} footer={footer}>
        <View style={[styles.flexRow, {marginTop: 20}]}>
            <Text style={[styles.header, {lineHeight: 20}]}>Add damages</Text>
            <Button style={styles.iconButton}
                    onPress={() => navigator.push('AddDamageScreen', {carInfo, startTime, damages: damagesCopy})}>
                <Icon name="add"/>
            </Button>
        </View>
        <List>
            {
                Object.keys(damagesCopy).map(key => {
                    const damage = damagesCopy[key];

                    return <ListItem thumbnail key={key} onPress={() => navigator.push('AddDamageScreen', {
                        carInfo,
                        startTime,
                        damages: damagesCopy,
                        currentDamageKey: key
                    })}>
                        <Left>
                            <Thumbnail square source={{uri: damage.photos && damage.photos.length ? damage.photos[0] : null}}/>
                        </Left>
                        <Body>
                            <Text>Area {damage.part}</Text>
                            {
                                <Text key={damage.type} note numberOfLines={1}>
                                    {damage.type}: {damage.degree}
                                </Text>
                            }
                        </Body>
                        <Right>
                            <Button transparent style={styles.iconButton} onPress={() => deleteDamage(key)}>
                                <Icon name="close"/>
                            </Button>
                        </Right>
                    </ListItem>
                })}
        </List>
    </Layout>
}
