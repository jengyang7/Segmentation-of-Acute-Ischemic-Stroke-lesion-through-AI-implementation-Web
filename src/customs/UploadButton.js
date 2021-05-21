import React, { useContext, useCallback } from "react";
import { UploadyContext } from "@rpldy/uploady";
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { globalStyle } from '../styles/global';


export const Ubutton = () => {
    const uploady = useContext(UploadyContext);

    const onClick = useCallback(() => {
        uploady.showFileUpload();
    });

    return (
        <TouchableOpacity onPress={onClick}>
            <Text style={[globalStyle.subTitleText, { fontSize: 14, color: 'blue' }]}>
                Choose your files
        </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10
    },
    underlineNavi: {
        marginLeft: 8,
    }
});
