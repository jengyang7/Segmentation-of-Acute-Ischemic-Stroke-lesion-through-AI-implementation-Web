import React, { useContext } from 'react';
import { TouchableOpacity, Dimensions, Text, View, TextInput, StyleSheet, ImageBackground } from 'react-native';
import { Context } from '../context/WebContext';
import { navigate } from '../navigationRef';
import { globalStyle } from '../styles/global';

const { height, width } = Dimensions.get('window');


const RegisterScreen = () => {
    const { state, setRegisterUserName, setRegisterPassword, setComfirmPassword, setEmail, reset } = useContext(Context);

    const onSubmit = async () => {
        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: state.registerUsername, password: state.registerPassword, email: state.registerEmail })
        };
        try {
            let resp = await fetch('/register', reqOption).then(data => data.json());
            return resp.success ? navigate('Login') : alert('The email address or username is being used.');
        } catch (error) {
            console.log(`Error: ${error}`)
        }
    };

    const checkInput = () => {
        let email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;  //eslint-disable-line

        if (state.registerEmail === '') {
            alert('Please enter your email address.')
            return false;
        }
        else if (!email.test(state.registerEmail)) {
            alert('Please enter a valid email address.')
            return false;
        }
        else if (state.registerUsername === '') {
            alert('Please enter your username.')
            return false;
        }

        else if (state.registerPassword === '') {
            alert('Please enter your password.');
            return false;
        }

        else if (state.registerPassword.length < 8) {
            alert('Your password must have at least 8 characters')
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
        <View >
            <ImageBackground style={styles.background} source={require('../images/login_1.jpg')} />
            <View style={{ marginHorizontal: height * 0.444, marginTop: height * 0.07778, background: 'white', opacity: 0.9, padding: height * 0.01, borderRadius: 20 }}>
                <View style={styles.mainView}>
                    <Text style={[globalStyle.titleText, { color: 'lightslategrey', fontSize: height * 0.0556, fontWeight: 'bold' }]}>
                        Create your account
            </Text>
                    <View style={{ margin: height * 0.03, width: width * 0.3, paddingTop: height * 0.0222 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[globalStyle.subTitleText, { fontSize: 20 }]}>
                                Email address
                    </Text>
                            <Text style={[styles.asterisk, globalStyle.subTitleText, { fontSize: 14 }]}>
                                *
                    </Text>
                        </View>
                        <TextInput
                            style={[globalStyle.infoText, styles.viewInput]}
                            accessible={true}
                            accessibilityLabel='Click to enter your email address'
                            accessibilityHint='The email address field is required to fill in to create an account.'
                            placeholder="Enter email address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            value={state.email}
                            onChangeText={setEmail}
                        />
                        <View style={{ flexDirection: 'row', paddingTop: height * 0.0222 }}>
                            <Text style={[globalStyle.subTitleText, { fontSize: 20 }]}>
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
                        <View style={{ flexDirection: 'row', paddingTop: height * 0.0222 }}>
                            <Text style={[globalStyle.subTitleText, { fontSize: 20 }]}>
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
                        <View style={{ flexDirection: 'row', paddingTop: height * 0.0222 }}>
                            <Text style={[globalStyle.subTitleText, { fontSize: 20 }]}>
                                Comfirm Password
                    </Text>
                            <Text style={[styles.asterisk, globalStyle.subTitleText, { fontSize: 14 }]}>
                                *
                    </Text>
                        </View>
                        <TextInput
                            style={[globalStyle.infoText, styles.viewInput, { marginBottom: height * 0.04 }]}
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
                            <Text style={[globalStyle.buttonText, { fontSize: 20, color: 'white', fontWeight: 'bold' }]}>
                                Create Account
                    </Text>
                        </TouchableOpacity>
                        <View style={styles.bottomText}>
                            <Text style={[globalStyle.subTitleText, { fontSize: 17 }]}>
                                Already signed up?
                    </Text>
                            <TouchableOpacity
                                style={styles.underlineNavi}
                                accessible={true}
                                accessibilityLabel='Click to sign in'
                                accessibilityHint='By clicking on this button, you will be be prompted to the Login Screen.'
                                onPress={() => {
                                    navigate('Login');
                                    reset();
                                }}
                            >
                                <Text style={[globalStyle.subTitleText, { fontSize: 17 }]}>
                                    Sign In
                        </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    );
};


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
        backgroundColor: 'lightsteelblue',
        padding: height * 0.025,
        borderRadius: height * 0.025
    },
    underlineNavi: {
        marginLeft: 8,
        borderBottomWidth: 1,
        borderColor: 'blue'
    },
    bottomText: {
        flexDirection: 'row',
        paddingTop: 10
    },
    background: {
        width: width, height: height,
        resizeMode: "cover",
        backgroundColor: 'white',
        opacity: 0.3,
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
});

export default RegisterScreen;





