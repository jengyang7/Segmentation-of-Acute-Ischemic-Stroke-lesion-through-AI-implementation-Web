import React, { useContext } from 'react';
import { TouchableOpacity, Dimensions, Text, View, TextInput, StyleSheet } from 'react-native';
import { Context } from '../context/WebContext';
import { navigate } from '../navigationRef';
import { globalStyle } from '../styles/global';


const RegisterScreen = () => {
    const { state, setRegisterUserName, setRegisterPassword, setComfirmPassword } = useContext(Context);

    const onSubmit = async () => {
        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: state.registerUsername, password: state.registerPassword })
        };
        try {
            let resp = await fetch('/register', reqOption).then(data => data.json());
            return resp.success ? navigate('Login') : () => { };
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    };

    const checkInput = () => {
        if (state.registerUsername === '') {
            alert('Please enter your username.')
            return false;
        }

        else if (state.registerPassword === '') {
            alert('Please enter your password.');
            return false;
        }

        else if (state.comfirmPassword === '') {
            alert('Please comfirm your password.');
            return false;
        }

        else if (state.comfirmPassword !== state.registerPassword) {
            alert('Please make sure your comfirm password is the same as your password.');
            return false;
        }
        return true;
    }

    return (
        <View style={styles.mainView}>
            <Text style={globalStyle.titleText}>
                Create your account
            </Text>
            <View style={{ margin: height * 0.03, width: width * 0.3 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[globalStyle.subTitleText, { fontSize: 14 }]}>
                        Username
                    </Text>
                    <Text style={[styles.asterisk, globalStyle.subTitleText, { fontSize: 14 }]}>
                        *
                    </Text>
                </View>
                <TextInput
                    style={styles.viewInput}
                    accessible={true}
                    accessibilityLabel='Click to enter your username'
                    accessibilityHint='The username field is required to fill in to create an account.'
                    placeholder="Enter username"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={state.registerUsername}
                    onChangeText={setRegisterUserName}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[globalStyle.subTitleText, { fontSize: 14 }]}>
                        Password
                    </Text>
                    <Text style={[styles.asterisk, globalStyle.subTitleText, { fontSize: 14 }]}>
                        *
                    </Text>
                </View>
                <TextInput
                    style={[globalStyle.infoText, styles.viewInput]}
                    accessible={true}
                    accessibilityLabel='Click to enter your password'
                    accessibilityHint='The password field is required to fill in to create an account.'
                    secureTextEntry={true}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={state.registerPassword}
                    onChangeText={setRegisterPassword}
                />
                <View style={{ flexDirection: 'row' }}>
                    <Text style={[globalStyle.subTitleText, { fontSize: 14 }]}>
                        Comfirm Password
                    </Text>
                    <Text style={[styles.asterisk, globalStyle.subTitleText, { fontSize: 14 }]}>
                        *
                    </Text>
                </View>
                <TextInput
                    style={[globalStyle.infoText, styles.viewInput]}
                    accessible={true}
                    accessibilityLabel='Click to retype your password'
                    accessibilityHint='This field is required to fill in to ensure you are aware of your password and to avoid from typing wrongly.'
                    secureTextEntry={true}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={state.comfirmPassword}
                    onChangeText={setComfirmPassword}
                />
                <TouchableOpacity
                    style={styles.button}
                    accessible={true}
                    accessibilityLabel='Click to sign up'
                    accessibilityHint='By clicking on this button, you will be able to be prompted back to the Login Screen, if the account is created successfully.'
                    onPress={() => checkInput() ? onSubmit() : () => { }}
                >
                    <Text style={globalStyle.buttonText}>
                        Create Account
                    </Text>
                </TouchableOpacity>
                <View style={styles.bottomText}>
                    <Text style={[globalStyle.subTitleText, { fontSize: 14 }]}>
                        Already signed up?
                    </Text>
                    <TouchableOpacity
                        style={styles.underlineNavi}
                        accessible={true}
                        accessibilityLabel='Click to sign in'
                        accessibilityHint='By clicking on this button, you will be be prompted to the Login Screen.'
                        onPress={() => navigate('Login')}
                    >
                        <Text style={[globalStyle.subTitleText, { fontSize: 14, color: 'blue' }]}>
                            Sign In
                        </Text>
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
        marginBottom: height * 0.019,
        fontSize: 14
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        padding: 8,
        borderRadius: 4
    },
    underlineNavi: {
        marginLeft: 8,
        borderBottomWidth: 1,
        borderColor: 'blue'
    },
    bottomText: {
        flexDirection: 'row',
        paddingTop: 10
    }
});

export default RegisterScreen;





