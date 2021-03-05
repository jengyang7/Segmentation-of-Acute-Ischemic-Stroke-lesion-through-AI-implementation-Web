import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './Login'
import Home from './Home';
import * as serviceWorker from './serviceWorker';

const appContainer = document.getElementById('home')

const loginComponent = <Login />
const homeComponenet =  <Home />

const components = <>
  {homeComponenet}
  {loginComponent}
  
</>

ReactDOM.render(components, appContainer)

  
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
