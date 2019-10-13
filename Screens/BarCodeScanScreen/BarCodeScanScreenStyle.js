import { StyleSheet } from 'react-native';
import AppStyles from '../../Theme/ApplicationStyles';

export default StyleSheet.create({
    main: {
        ...AppStyles.flexColumn,
        backgroundColor: 'white',
    },
    scanner: {
        width: '100%',
        height: '100%'
    },
    bottom: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        ...AppStyles.flexRow
    },
    top: {
        position: 'absolute',
        width: '100%',
        top: 50,
        left: 20
    },
    textInput: {
        ...AppStyles.textInput
    },
    label: {
        ...AppStyles.textCenter
    },
    inputContainer: {
        paddingTop: 15,
        alignSelf: 'stretch'
    },
    button: {
        marginBottom: 10
    },
    margin: {
        marginBottom: 20
    }
});
