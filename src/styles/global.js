import { StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export const globalStyle = StyleSheet.create({
    titleText: {
        fontFamily: 'Avenir Next',
        fontSize: height * 0.0556,
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    subTitleText: {
        fontFamily: 'Avenir Next',
        fontSize: height * 0.027778,
        color: 'lightslategrey'
    },
    infoText: {
        fontFamily: 'Avenir Next',
        fontSize: height * 0.02222
    },
    buttonText: {
        fontFamily: 'Avenir Next',
        color: 'white',
        fontWeight: 'bold',
        fontSize: height * 0.0222
    }
});
