import React from 'react';
import { Redirect } from 'react-router-dom';
import { View, TextInput, StyleSheet, Button } from 'react-native';

var username;
var userpassword;

const onSubmit = async () => {
    const reqOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.userpassword })
    };
    let resp = await fetch('/login', reqOption)
    let respJson = resp.json().success
    return respJson ? <Redirect to="/home" /> : <Redirect to="/login_error" />
}

const checkInput = async() => {
    const reqOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username, password: this.userpassword })
    };
    let resp = await fetch('/login', reqOption)
    let respJson = resp.json().success
    return respJson;
}

const setUserName = (e) => {
    username = e
}
const setPassword = (e) => {
    userpassword = e
}
const doNothing = () => {

}

const LoginScreen = props => {
    return (
        <form  onSubmit={onSubmit.bind(this)}>
            <label id="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" onChange={(e) => setUserName(e.target.value)} required />
            <label id="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="userpassword" onChange={(e) => setPassword(e.target.value)} required />
            <Button color='green' title='Login' onPress= {() => checkInput ? props.navigation.navigate('Home') : doNothing} id= "submit"/>
            <label>
                <input type="checkbox" name="remember" onChange={doNothing} /> Remember me
                </label>
        </form>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 30
    },
});

export default LoginScreen;




