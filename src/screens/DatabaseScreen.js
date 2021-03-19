import React from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
    return (
        <View>
            <Text style={styles.text}>Your Data</Text>
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
        bottom: 50,
    }
});

export default HomeScreen;
