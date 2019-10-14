import {StyleSheet} from 'react-native';
import AppStyles from '../../Theme/ApplicationStyles';
const button = {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
};
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
        marginBottom: 10
    },
    image: {
        alignSelf: 'center',
        justifyContent: 'flex-start',
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
    iconButton: {
        width: 50,
        height: 50,
        marginLeft: 20
    },
    button: {
        ...button
    },
    damagePhoto: {
        width: 75,
        height: 75,
        alignSelf: 'center',
        marginBottom: 10
    },
    photo: {
        ...AppStyles.flexRow,
        marginTop: 10
    }
});
