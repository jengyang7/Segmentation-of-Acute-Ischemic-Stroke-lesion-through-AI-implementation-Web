import React from 'react';
import { TouchableOpacity, Dimensions, View, Text, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.body}>
            <View>
                <Text style={styles.text}>
                    Welcome User!
                </Text>
                <Text style={styles.padding}>
                    How to use?
                </Text>
                <Text style={styles.padding}>
                    1) ...
                </Text>
                <Text style={styles.padding}>
                    2) ...
                </Text>
                <Text style={styles.padding}>
                    3) ...
                </Text>
            </View>
            <View style={styles.viewButton}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Database')} >
                    Access Database
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Upload')} >
                    Upload Image
                </TouchableOpacity>
            </View>
        </View>)
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    body: {
        padding: height * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    text: {
        fontSize: 40
    },
    padding: {
        paddingTop: 20,
        fontSize: 20
    },
    viewButton: {
        justifyContent: 'space-around',
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        padding: 8,
        borderRadius: 4
    }
});

export default HomeScreen;
