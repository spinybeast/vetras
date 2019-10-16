import { StyleSheet } from 'react-native';
import AppStyles from '../../../Theme/ApplicationStyles';

export default StyleSheet.create({
    ...AppStyles,
    scanner: {
        width: '100%',
        height: '100%'
    },
    bottom: {
        position: 'absolute',
        width: '100%',
        bottom: 0
    },
    topLeft: {
        position: 'absolute',
        width: 50,
        top: 50,
        left: 20
    },
    topRight: {
        position: 'absolute',
        width: 50,
        top: 50,
        right: 20
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
    buttonLeft: {
        marginRight: 5,
        marginLeft: 10
    },
    buttonRight: {
        marginLeft: 5,
        marginRight: 10
    },
    margin: {
        marginBottom: 20
    }
});
