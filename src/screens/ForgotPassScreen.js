import React, { useState, useContext, useEffect } from 'react';
import { TouchableOpacity, Dimensions, Image, Text, View, TextInput, StyleSheet } from 'react-native';
import { Context } from '../context/WebContext';
import { navigate } from '../navigationRef';
import { globalStyle } from '../styles/global';


const ForgotPassScreen = () => {
    const [email, setEmail] = useState('');
    return (
        <View style={{ padding: height * 0.03 }}>
            <Text style={globalStyle.titleText}>
                Reset your password
            </Text>
            <View style={{ alignSelf: 'center', width: width * 0.4, marginTop: 25 }}>
                <Text style={[globalStyle.subTitleText, { fontSize: 17, alignSelf: 'center' }]}>
                    Enter your user account's email address and we will send you a password reset link.
                </Text>
                <TextInput
                    style={[globalStyle.infoText, styles.viewInput]}
                    accessible={true}
                    accessibilityLabel='Click to enter your username'
                    accessibilityHint='The username field is required to fill in to login.'
                    placeholder="Enter your email address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={newValue => setEmail(newValue)}
                />
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityLabel='Click to send password reset email'
                    accessibilityHint='By clicking on this button, a password reset link will be sent to your email.'
                    onPress={() => { }}
                >
                    <Text style={globalStyle.buttonText}>
                        Send password reset email
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    viewInput: {
        borderRadius: 4,
        paddingHorizontal: height * 0.013,
        paddingVertical: height * 0.018,
        marginBottom: height * 0.019,
        fontSize: 15
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        padding: 8,
        borderRadius: 4,
        marginTop: 10
    }
});

export default ForgotPassScreen;