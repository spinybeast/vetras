import { StyleSheet } from 'react-native';
import AppStyles from '../../../Theme/ApplicationStyles';

export default StyleSheet.create({
    ...AppStyles,
    header: {
        ...AppStyles.textCenter
    },
    subheader: {
        ...AppStyles.textCenter,
        color: '#cccccc'
    },
    button: {
        marginTop: 20
    }
});
