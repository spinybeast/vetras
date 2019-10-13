import {StyleSheet} from 'react-native';
import AppStyles from '../../Theme/ApplicationStyles';

export default StyleSheet.create({
    ...AppStyles,
    main: {
        flex: 1,
        paddingTop: 45,
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 20
    },
    label: {
        fontSize: 20,
        paddingLeft: 20,
        color: '#CCCCCC'
    },
    margin: {
        marginBottom: 15
    },
    image: {
        alignSelf: 'center',
        paddingTop: 40,
        zIndex: 0
    },
    slider: {
        flex: 1,
        marginLeft: 10,
        paddingTop: 35,
        paddingBottom: 30,
        alignItems: 'stretch',
        justifyContent: 'center',
    },
    transparent: {
        backgroundColor: 'transparent'
    },
    grey: {
        backgroundColor: '#cccccc'
    },
    iconButton: {
        width: 50,
        height: 50,
        marginLeft: 20
    },
    damagePhoto: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 10
    }
});
