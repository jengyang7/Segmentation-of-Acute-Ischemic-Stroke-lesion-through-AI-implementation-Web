import React, { useContext, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { Context } from '../context/WebContext';
import bcrypt from "bcryptjs";
// import { Extypo } from '@expo/vector-icons';


const RegisterScreen = ({ navigation }) => {
    const { state, setRegisterUserName, setRegisterPassword } = useContext(Context);

    const onSubmit = async () => {
        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: state.registerUsername, password: bcrypt.hashSync(state.registerPassword, 8)})
        };
        state.registerPassword = ''
        state.registerUsername = ''
        try {
            let resp = await fetch('/register', reqOption).then(data => data.json());
            return resp.success ? navigation.navigate('Login') : () => { };
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    };

    return (
        <View>
            <Text>Username</Text>
            <TextInput placeholder="Enter username" autoCapitalize="none" autoCorrect={false} value={state.registerUsername} onChangeText={setRegisterUserName}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={state.registerPassword} placeholder="Enter password" autoCapitalize="none" autoCorrect={false} value={state.registerPassword} onChangeText={setRegisterPassword}></TextInput>
            <Button color='green' title='register' onPress={() => onSubmit()} />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default RegisterScreen;





