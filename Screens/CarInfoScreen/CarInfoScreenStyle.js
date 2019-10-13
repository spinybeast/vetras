import { StyleSheet } from 'react-native';
import AppStyles from '../../Theme/ApplicationStyles';

export default StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: 45,
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    label: {
        fontSize: 20,
        paddingLeft: 20,
        color: '#CCCCCC'
    },
    textInput: {
        ...AppStyles.textInput
    },
    inputContainer: {
        paddingTop: 15
    },
    image: {
        alignSelf: 'center',
        paddingTop: 40,
        zIndex: 0
    },
    slider:{
        flex: 1,
        marginLeft: 10,
        paddingTop: 35,
        paddingBottom: 30,
        alignItems: 'stretch',
        justifyContent: 'center',
    }
});
