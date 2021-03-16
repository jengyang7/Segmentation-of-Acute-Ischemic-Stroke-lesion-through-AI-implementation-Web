import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DatabaseScreen from './screens/DatabaseScreen';
import UploadScreen from './screens/UploadScreen';
import logo from './logo.svg';
import { Provider } from './context/WebContext';
import React from 'react';

const navigator =  createStackNavigator(
  {
    Main: LoginScreen,
    Home: HomeScreen,
    Database: DatabaseScreen,
    Upload: UploadScreen
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      title: 'Welcome to React'
    }
  }
);

// export default App;
const App = createAppContainer(navigator);

export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  )
}
