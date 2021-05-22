import React, { useContext, useEffect } from 'react';
import { ImageBackground, TouchableOpacity, Dimensions, Image, Text, View, TextInput, StyleSheet } from 'react-native';
import { Context } from '../context/WebContext';
import { navigate } from '../navigationRef';
import { globalStyle } from '../styles/global';


const LoginScreen = () => {
    const { state, setUserName, setPassword, login, getToken, toggleRememberMe } = useContext(Context);

    useEffect(() => {
        getToken();
    }, []);

    const checkInput = () => {
        if (state.username === '') {
            alert('Please enter your username.')
            return false;
        }

        else if (state.password === '') {
            alert('Please enter your password.');
            return false;
        }
        return true;
    }

    return (
        <View>
                <View style={{ padding: height * 0.03 }}>
                <ImageBackground  style={styles.background} source={require('../images/login_1.jpg')} />
                    <Text style={globalStyle.titleText}>
                        Stroke.AI
                    </Text>
                    <Text style={{fontFamily: 'Avenir Next',
                                fontSize: 18,
                                fontWeight: 'bold',
                                alignSelf: 'center'}}>
                        Identify the hidden stroke lesion
                    </Text>
                    <View style={styles.body}>
                        
                        <View style={{ width: width * 0.3, height: height*0.72 , background:'white', opacity: 0.9, padding: 10 , borderRadius: 20 }}>
                            <View style={{paddingHorizontal: 40, paddingTop: 40}}>
                                <Text style={[globalStyle.subTitleText, {fontWeight: 'bold'}]}>
                                    About Us
                                </Text>
                                <Text style={[globalStyle.infoText, { paddingVertical: 20, lineHeight: 40}]}>
                                    An application developed by team MA_B_5. This application enables users to upload medical brain images 
                                    and perform image segmentation. This will segment out any possible stroke lesion of the brain. 
                                    Users will be able to view the segmented result and have a better understanding through the result. 
                                    
                                </Text>
                                <Text style={[globalStyle.infoText, { paddingVertical: 20 , lineHeight: 40}]}>
                                    This application is easy to use and it has been tested our by the team and others. 
                                    We hope you enjoy browsing through and using the application!
                                </Text>
                            </View>
                            
                        </View>
                        <View>
                            
                            <View style={{ width: width * 0.3, height: height*0.45 ,background:'white', opacity: 0.9, padding: 10 , paddingVertical:20, borderRadius: 20 }}>
                            <View style={{padding: 10}}>
                            <Text style={[globalStyle.subTitleText, {fontSize: 25, paddingTop: 20}]}>
                                Username
                            </Text>
                            <TextInput
                                style={[globalStyle.infoText, styles.viewInput]}
                                accessible={true}
                                accessibilityLabel='Click to enter your username'
                                accessibilityHint='The username field is required to fill in to login.'
                                placeholder="Enter username"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={state.username}
                                onChangeText={setUserName}
                            />
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20}}>
                                <Text style={[globalStyle.subTitleText, {fontSize: 25}]}>
                                    Password
                                </Text>
                                <TouchableOpacity 
                                    style={{color: 'blue'}}
                                    accessible={true}
                                    accessibilityLabel='Click if you forgot your password.'
                                    accessibilityHint='By clicking on this button, you will be prompt to another screen where you can reset your password by following the steps.'
                                    onPress={() => navigate('ForgetPassword')}
                                >
                                    <Text style={[globalStyle.subTitleText, {fontSize: 13, color: 'blue'}]}>
                                        Forgot password?
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={[globalStyle.infoText, styles.viewInput]}
                                accessible={true}
                                accessibilityLabel='Click to enter your password'
                                accessibilityHint='The password field is required to fill in to login.'
                                secureTextEntry={true}
                                placeholder="Enter password"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={state.password}
                                onChangeText={setPassword}
                            />
                            <label style={{ marginBottom: 15 }}>
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={state.rememberMe}
                                    onChange={() => toggleRememberMe(state.rememberMe)}
                                />
                                <Text style={[globalStyle.infoText, {fontSize: 15}]}>
                                    Remember me
                                </Text>
                            </label>
                            <View style={styles.viewButton}>
                                <TouchableOpacity
                                    style={styles.button}
                                    accessible={true}
                                    accessibilityLabel='Click to sign in'
                                    accessibilityHint='By clicking on this button, you will be able to login to the homescreen where you can learn the instructions of using the application, if the details of your account is correct.'
                                    onPress={() => checkInput() ? login(state.username, state.password, state.rememberMe) : () => { }}
                                >
                                    <Text style={globalStyle.buttonText}>
                                        Sign In
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.button}
                                    accessible={true}
                                    accessibilityLabel='Click to sign up'
                                    accessibilityHint='By clicking on this button, you will be prompted to a new interface, where you will be able to create a new account.'
                                    onPress={() => navigate('Register')}
                                >
                                    <Text style={globalStyle.buttonText}>
                                        Sign Up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            
                            </View>
                            
                        </View>
                        <View style={{ width: width * 0.3, height: height*0.25 ,background:'white', opacity: 0.9, padding: 10 , marginTop: 30, borderRadius: 20 }}>
                                <View style={{paddingHorizontal: 40, paddingTop: 40}}>
                                    <Text style={[globalStyle.subTitleText, {fontWeight: 'bold'}]}>
                                        Contributor
                                    </Text>
                                    <Text style={[globalStyle.infoText, { paddingVertical: 15, lineHeight: 40}]}>
                                        Cheah Kin Shuen, Teng Kong Man, Jeng Yang Kong
                                        Special Thanks to Dr. Sicily for guidance.
                                    </Text>
                                </View>
                            </View>
                        </View>
                        
                        
                    </View>
                </View>
                
            
        </View>
    );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    viewButton: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10,
        paddingTop: 20
    },
    image: {
        width: width * 0.4,
        height: height * 0.3
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
    button: {
        alignItems: 'center',
        backgroundColor: 'cyan',
        padding: 15,
        borderRadius: 15
    },
    viewInput: {
        borderRadius: 4,
        paddingHorizontal: height * 0.013,
        paddingVertical: height * 0.018,
        marginBottom: height * 0.019,
        fontSize: 15
    },
    body: {
        margin: height * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

export default LoginScreen;
