import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import logo from './logo.svg';

const navigator =  createStackNavigator(
  {
    Main: LoginScreen,
    Home: HomeScreen
  },
  {
    initialRouteName: 'Main',
    defaultNavigationOptions: {
      title: 'Welcome to React'
    }
  }
);

// export default App;
export default createAppContainer(navigator);
