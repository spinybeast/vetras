import React, { useState } from 'react';
import { Text, View, Button, Icon, List, ListItem, Thumbnail, Left,Body, Footer, FooterTab } from 'native-base';
import styles from './CarInfoScreenStyle';
import Layout from '../../Theme/Layout';

export default function DamageScreen({navigator, carInfo, damages = {}}) {
    let footer = null;
    if (Object.keys(damages).length > 0) {
        footer = <FooterTab>
            <Button full onPress={() => navigator.push('ServicesScreen', {carInfo, damages})}>
                <Text>Submit</Text>
            </Button>
        </FooterTab>
    }
    return <Layout centeredContent={false} footer={footer}>
        <View style={[styles.flexRow, {marginTop: 20}]}>
            <Text style={[styles.header, {lineHeight:20}]}>Add damages</Text>
            <Button style={styles.iconButton} onPress={() => navigator.push('AddDamageScreen', {carInfo, damages})} >
                <Icon name="add"/>
            </Button>
        </View>
        <List>
            {Object.keys(damages).map(key =>
                <ListItem thumbnail key={key} onPress={() => navigator.push('AddDamageScreen', {carInfo, damages, currentDamage: key})}>
                    <Left>
                        <Thumbnail square source={{ uri: damages[key].photo }} />
                    </Left>
                    <Body>
                        <Text>Area {key}</Text>
                        {
                            Object.keys(damages[key]).map(damage => {
                                    if (damage !== 'photo') {
                                        return <Text key={damage} note numberOfLines={1}>
                                            {damage}: {damages[key][damage]}
                                        </Text>
                                    }
                                    return null;
                                }
                            )
                        }
                    </Body>
                </ListItem>
            )}

        </List>
    </Layout>

}
