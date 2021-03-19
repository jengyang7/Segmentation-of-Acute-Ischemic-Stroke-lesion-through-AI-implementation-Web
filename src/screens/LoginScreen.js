import React, { useContext, useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
import { Context } from '../context/WebContext';
// import { Extypo } from '@expo/vector-icons';


const LoginScreen = ({ navigation }) => {
    const { state, setUserName, setPassword } = useContext(Context);

    const onSubmit = async () => {
        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: state.username, password: state.password })
        };
        try {
            let resp = await fetch('/login', reqOption).then(data => data.json());
            return resp.success ? navigation.navigate('Home') : () => { };
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    };

    return (
        <View>
            <Text>Username</Text>
            <TextInput placeholder="Enter username" autoCapitalize="none" autoCorrect={false} value={state.username} onChangeText={setUserName}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={state.password} placeholder="Enter password" autoCapitalize="none" autoCorrect={false} value={state.password} onChangeText={setPassword}></TextInput>
            <Button color='green' title='Login' onPress={() => onSubmit()} />
            <label>
                <input type="checkbox" name="remember" onChange={() => { }} /> Remember me
            </label>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    }
});

export default LoginScreen;





