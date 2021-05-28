import React, { useContext, useCallback } from "react";
import { UploadyContext } from "@rpldy/uploady";
import { TouchableOpacity, Image, Text, StyleSheet, View, Dimensions } from 'react-native';
import { globalStyle } from '../styles/global';

const { height, width } = Dimensions.get('window');

export const Ubutton = () => {
    const uploady = useContext(UploadyContext);

    const onClick = useCallback(() => {
        uploady.showFileUpload();
    });

    return (
        <View style={{ alignSelf: 'center' }}>
            <Image source={require('../images/uploadlogo.png')} style={{ width: height * 0.0555, height: height * 0.0555, marginBottom: height * 0.0222, alignSelf: 'center' }} />
            <TouchableOpacity
                onPress={onClick}
                style={[styles.button, { backgroundColor: 'lightsteelblue', marginHorizontal: 5, textAlign: 'center' }]}
            >
                <Text style={[globalStyle.subTitleText, { fontSize: height * 0.01888, color: 'white', fontWeight: 'bold' }]}>
                    Choose your files
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        marginVertical: 20,
        alignSelf: 'center',
        width: width * 0.12,
        alignItems: 'center',
        borderRadius: 10,
        padding: 15
    },
    underlineNavi: {
        marginLeft: 8,
    }
});
