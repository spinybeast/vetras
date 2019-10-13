import { StyleSheet } from 'react-native';
import AppStyles from '../../Theme/ApplicationStyles';

export default StyleSheet.create({
    main: {
        ...AppStyles.flexColumn,
        backgroundColor: 'white',
    },
    label: {
        ...AppStyles.textCenter
    },
    margin: {
        marginBottom: 20,
    }
});
