import React, { Component } from 'react';
import { StyleSheet,Button } from 'react-native';


export default class LoginScreen extends Component{
    constructor(props){
        super(props)
        this.username = ""
        this.userpassword = "" 
    }
    setUserName = (e) => {
        this.username = e
    }
    setPassword = (e) => {
        this.userpassword = e
    }
    doNothing = () => {
    
    }
    onSubmit = async() => {
        const reqOption = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: this.username, password: this.userpassword })
        };
        let resp = await fetch('/login', reqOption).then(data=>data.json())
        return resp.success ? this.props.navigation.navigate('Home') : this.doNothing()
    }

    render(){
        // const styles = StyleSheet.create({
        //     text: {
        //         fontSize: 30
        //     },
        // });
        return (
            <form  >
                <label id="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" onChange={(e) => this.setUserName(e.target.value)} required />
                <label id="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="userpassword" onChange={(e) => this.setPassword(e.target.value)} required />
                <Button color='green' title='Login' onPress= {() => this.onSubmit() } id= "submit"/>
                <label>
                    <input type="checkbox" name="remember" onChange={this.doNothing} /> Remember me
                    </label>
            </form>
        );
    }
};




