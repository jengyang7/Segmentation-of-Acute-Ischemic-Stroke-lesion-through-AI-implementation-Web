import React, { useContext } from 'react';
import { Alert, TouchableOpacity, Dimensions, Image, Text, View, TextInput, StyleSheet } from 'react-native';
import { Context } from '../context/WebContext';

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
            return resp.success ? navigation.navigate('Home') : alert('Incorrect username or password.');
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    };

    const checkInput = () => {
        if (state.username == '') {
            alert('Please enter your username.')
            return false;
        }

        else if (state.password == '') {
            alert('Please enter your password.');
            return false;
        }

        return true;
    }

    return (
        <View>
            <View style={{ padding: height * 0.03 }}>
                <Text style={styles.welcomeText}>
                    Welcome to Segmentation
                </Text>
                <View style={styles.body}>
                    <View style={{ width: width * 0.3 }}>
                        <Text>
                            Username
                        </Text>
                        <TextInput style={styles.viewInput} placeholder="Enter username" autoCapitalize="none" autoCorrect={false} value={state.username} onChangeText={setUserName} />
                        <Text>
                            Password
                        </Text>
                        <TextInput style={styles.viewInput} secureTextEntry={true} placeholder="Enter password" autoCapitalize="none" autoCorrect={false} value={state.password} onChangeText={setPassword} />
                        <label style={{ marginBottom: 15 }}>
                            <input type="checkbox" name="remember" onChange={() => { }} /> Remember me
                        </label>
                        <View style={styles.viewButton}>
                            <TouchableOpacity style={styles.button} onPress={() => checkInput() ? onSubmit() : () => { }} >
                                Sign In
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')} >
                                Sign Up
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ width: width * 0.4 }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            About Us
                        </Text>
                        <Text style={{ fontSize: 16, paddingVertical: 20 }}>
                            Free Acute Ischemic Stroke segmentation service. The result is inaccurate so beware of using it. Scammer website alert.
                        </Text>
                        <Image style={styles.image} source={require('../images/Capture2.JPG')} />
                    </View>
                </View>
            </View>
        </View>
    );
};

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    welcomeText: {
        fontSize: 40,
        alignSelf: 'center'
    },
    viewButton: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginBottom: 10
    },
    image: {
        width: width * 0.4,
        height: height * 0.3
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white',
        padding: 8,
        borderRadius: 4
    },
    viewInput: {
        borderRadius: 4,
        paddingHorizontal: height * 0.013,
        paddingVertical: height * 0.018,
        marginBottom: height * 0.019
    },
    body: {
        margin: height * 0.05,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export default LoginScreen;





