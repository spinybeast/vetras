import React from 'react';
import { View, Text } from 'react-native';

export default function TechnicianScreen({navigator}) {
    return <View
        style={{
            alignItems: 'center',
            backgroundColor: 'pink',
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center'
        }}>
        <Text>Screen is in developing</Text>
        <Text onPress={() => navigator.pop()}>Go back</Text>
    </View>

}
