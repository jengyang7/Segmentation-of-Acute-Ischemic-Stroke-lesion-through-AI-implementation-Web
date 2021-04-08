import { createAppContainer } from 'react-navigation';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DatabaseScreen from './screens/DatabaseScreen';
import UploadScreen from './screens/UploadScreen';
import RegisterScreen from './screens/RegisterScreen';
import logo from './logo.svg';
import { Provider } from './context/WebContext';
import React from 'react';


const navigator = createStackNavigator(
  {
    Login: LoginScreen,
    Register: RegisterScreen,
    Home: HomeScreen,
    Database: DatabaseScreen,
    Upload: UploadScreen
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Segmentation'
    }
  }
);

// export default App;
const App = createAppContainer(navigator);

export default () => {
  return (
    // Wrap into WebContext's Provider
    <Provider>
      <App />
    </Provider>
  )
}
