import React  from 'react';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {

  onSubmit = async() => {
    const reqOption = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.username , password : this.userpassword})
    };
    let resp = await fetch('/login',reqOption)
    let respJson = resp.json().success
    return respJson? <Redirect  to="/home" /> :<Redirect  to="/login_error" />
  }
  setUserName = (e) => {
    this.username = e
  }
  setPassword = (e) => {
    this.userpassword = e
  }
  doNothing = async()=>{

  }

  render() {
    return (
        <form onSubmit={this.onSubmit.bind(this)} >
            <label id="uname"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" onChange={(e) => this.setUserName(e.target.value)}required/>
            <label id="psw"><b>Password</b></label>
            <input type="password" placeholder="Enter Password" name="userpassword" onChange={(e) => this.setPassword(e.target.value)} required/>
            <button id= "submit">Login</button>
            <label>
                <input type="checkbox"  name="remember" onChange={this.doNothing.bind(this)}/> Remember me
            </label>
        </form>
    )
  }
}

export default Login;




