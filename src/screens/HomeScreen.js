import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';


export default class HomeScreen extends Component{
    render(){
        const styles = StyleSheet.create({
            text: {
                fontSize: 30
            }
        });
        return <Text style={styles.text}>Hi there!</Text>;
    }
}