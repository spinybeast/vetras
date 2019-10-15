import React, {useState, useEffect} from 'react';
import {Body, Button, Left, List, ListItem, Right, Text, Thumbnail} from 'native-base';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import Layout from "../../../Theme/Layout";
import styles from './JobScreenStyle';

export default function JobScreen({navigator, type, carInfo}) {

    return <Layout>
        <Text style={styles.header}>{type}</Text>
        <Text style={styles.subheader}>License Plate: {carInfo.licencePlate}</Text>
        <Button block><Text>Completed</Text></Button>
    </Layout>

}
