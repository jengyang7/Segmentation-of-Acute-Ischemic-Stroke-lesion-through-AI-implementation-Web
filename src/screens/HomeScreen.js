import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

const HomeScreen = props => {
    return (
        <View>
            <Text style={styles.text}>Welcome User!</Text>
            <Text style={styles.padding}>How to use?</Text>
            <View style={styles.style1}>
            <Button onPress={() => props.navigation.navigate('Database')} color='green' title='Access Database' />
            <Button onPress={() => props.navigation.navigate('Upload')} color='green' title='Upload DICOM'/></View>
            
                <Text style={styles.padding}>1) ...</Text>
                <Text style={styles.padding}>2) ...</Text>
                <Text style={styles.padding}>3) ...</Text>
            
        </View>);
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
    padding: {
        paddingTop: 20
    },
    style1: {
        position: 'absolute',
        right: 0,
        bottom: 50
    },
    style2: {
        margin: 20
    }
});

export default HomeScreen;
