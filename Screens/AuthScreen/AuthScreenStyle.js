import { StyleSheet } from 'react-native';
import AppStyles from '../../Theme/ApplicationStyles';

export default StyleSheet.create({
    header: {
        ...AppStyles.textCenter,
        fontSize: 20
    },
    margin: {
        marginBottom: 20,
    },
    error: {
        textAlign: 'center',
        color: '#c82829'
    }
});
