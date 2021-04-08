import React, { useContext, useState } from 'react';
import { TouchableOpacity, Dimensions, Text, View, TextInput, StyleSheet } from 'react-native';
import { Context } from '../context/WebContext';
import bcrypt from "bcryptjs";
// import { Extypo } from '@expo/vector-icons';


const RegisterScreen = ({ navigation }) => {
    const { state, setRegisterUserName, setRegisterPassword, setComfirmPassword } = useContext(Context);

    const onSubmit = async () => {
        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: state.registerUsername, password: bcrypt.hashSync(state.registerPassword, 8) })
        };
        try {
            let resp = await fetch('/register', reqOption).then(data => data.json());
            return resp.success ? navigation.navigate('Login') : () => { };
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    };

    const checkInput = () => {
        if (state.registerUsername == '') {
            alert('Please enter your username.')
            return false;
        }

        else if (state.registerPassword == '') {
            alert('Please enter your password.');
            return false;
        }

        else if (state.comfirmPassword == '') {
            alert('Please comfirm your password.');
            return false;
        }

        else if (state.comfirmPassword != state.registerPassword) {
            alert('Please make sure your comfirm password is the same as your password.');
            return false;
        }

        return true;
    }

    return (
        <View style={styles.mainView}>
            <Text style={{ fontSize: 40 }}>
                Create your account
            </Text>
            <View style={{ margin: height * 0.03, width: width * 0.3 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text>
                        Username
                    </Text>
                    <Text style={styles.asterisk}>
                        *
                    </Text>
                </View>
                <TextInput style={styles.viewInput} placeholder="Enter username" autoCapitalize="none" autoCorrect={false} value={state.registerUsername} onChangeText={setRegisterUserName} />
                <View style={{ flexDirection: 'row' }}>
                    <Text>
                        Password
                    </Text>
                    <Text style={styles.asterisk}>
                        *
                    </Text>
                </View>
                <TextInput style={styles.viewInput} secureTextEntry={true} placeholder="Enter password" autoCapitalize="none" autoCorrect={false} value={state.registerPassword} onChangeText={setRegisterPassword} />
                <View style={{ flexDirection: 'row' }}>
                    <Text>
                        Comfirm Password
                    </Text>
                    <Text style={styles.asterisk}>
                        *
                    </Text>
                </View>
                <TextInput style={styles.viewInput} secureTextEntry={true} placeholder="Enter password" autoCapitalize="none" autoCorrect={false} value={state.comfirmPassword} onChangeText={setComfirmPassword} />
                <TouchableOpacity style={styles.button} onPress={() => checkInput() ? onSubmit() : () => { }} >Create Account</TouchableOpacity>
                <View style={styles.bottomText}>
                    <Text>
                        Already signed up?
                    </Text>
                    <TouchableOpacity style={styles.underlineNavi} onPress={() => navigation.navigate('Login')} >
                        Sign In
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    mainView: {
        padding: height * 0.03,
        alignItems: 'center'
    },
    asterisk: {
        color: 'red',
        paddingLeft: 3
    },
    viewInput: {
        borderRadius: 4,
        paddingHorizontal: height * 0.013,
        paddingVertical: height * 0.018,
        marginBottom: height * 0.019
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        padding: 8,
        borderRadius: 4
    },
    underlineNavi: {
        color: 'blue',
        marginLeft: 8,
        borderBottomWidth: 1
    },
    bottomText: {
        flexDirection: 'row',
        paddingTop: 10
    }
});

export default RegisterScreen;





