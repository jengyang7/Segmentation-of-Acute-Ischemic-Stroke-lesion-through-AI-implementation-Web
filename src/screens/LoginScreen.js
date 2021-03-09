import React, { useState } from 'react';
import { Text, View, TextInput, StyleSheet, Button } from 'react-native';
// import { Extypo } from '@expo/vector-icons';


const LoginScreen = props => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password })
        };
        let resp = await fetch('/login', reqOption).then(data => data.json())
        return resp.success ? props.navigation.navigate('Home') : doNothing()
    }

    const checkInput = (usernameInput, passwordInput) => {
        if (usernameInput == '' || passwordInput == '') return false;
        return true;
    }

    const doNothing = () => { }

    return (
        <View>
            <Text>Username</Text>
            <TextInput placeholder="Enter username" autoCapitalize="none" autoCorrect={false} value={username} onChangeText={(newValue) => setUserName(newValue)}></TextInput>
            <Text>Password</Text>
            <TextInput secureTextEntry={password} placeholder="Enter password" autoCapitalize="none" autoCorrect={false} value={password} onChangeText={(newValue) => setPassword(newValue)}></TextInput>
            <Button color='green' title='Login' onPress={() => checkInput(username, password) ? onSubmit() : doNothing} />
            <label>
                <input type="checkbox" name="remember" onChange={doNothing} /> Remember me
                    </label>
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
});

export default LoginScreen;





