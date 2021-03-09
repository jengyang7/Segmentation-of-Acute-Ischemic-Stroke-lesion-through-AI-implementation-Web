import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DatabaseScreen from './screens/DatabaseScreen';
import UploadScreen from './screens/UploadScreen';
import logo from './logo.svg';

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
export default createAppContainer(navigator);
