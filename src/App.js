import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, HeaderBackButton } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DatabaseScreen from './screens/DatabaseScreen';
import UploadScreen from './screens/UploadScreen';
import RegisterScreen from './screens/RegisterScreen';
import logo from './logo.svg';
import { Provider } from './context/WebContext';
import React from 'react';
import { Dimensions, View, TouchableOpacity, StyleSheet } from 'react-native';
import FeatherIcon from 'feather-icons-react';
import { setNavigator } from './navigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from './navigationRef';


const navigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        headerRight: null
      })
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: () => ({
        title: 'Create account',
        headerRight: null,
        headerLeft: null
      })
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Instructions',
        headerLeft: null
      })
    },
    Database: {
      screen: DatabaseScreen,
      navigationOptions: () => ({
        title: 'Database'
      })
    },
    Upload: {
      screen: UploadScreen,
      navigationOptions: () => ({
        title: 'Upload'
      })
    },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: () => ({
      headerStyle: {
        backgroundColor: 'black'
      },
      headerTintColor: 'white',
      title: 'Segmentation',
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.viewIconText}>
            <FeatherIcon
              style={{ color: 'white', height: height * 0.025 }}
              accessible={true}
              accessiblityLabel='A home icon'
              accessibilityHint='Click to navigate to Home Screen where you can learn about the instructions to use the website.'
              icon='home'
              onClick={() => navigate('Home')}
            />
            <TouchableOpacity
              style={styles.textWithIcon}
              accessible={true}
              accessibilityLabel='Click me'
              accessibilityHint='Click to navigate to Home Screen where you can learn about the instructions to use the website.'
              onPress={() => navigate('Home')}
            >
              Home
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.navigationText}
            accessible={true}
            accessiblityLabel='Click me'
            accessibilityHint='Click to navigate to Database Screen where you can download or see the details of the image.'
            onPress={() => navigate('Database')}
          >
            Access Database
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationText}
            accessible={true}
            accessibilityLabel='Click me'
            accessibilityHint='Click to navigate to Upload Screen where you can upload your image to be segmented.'
            onPress={() => navigate('Upload')}
          >
            Upload Image
          </TouchableOpacity>
          <View style={styles.viewIconText}>
            <TouchableOpacity
              style={styles.textWithIcon}
              accessible={true}
              accessibilityLabel='Click me'
              accessibilityHint='Click to logout your current account and navigate you back to the Login Screen.'
              onPress={async () => {
                await AsyncStorage.removeItem('token')
                navigate('Login')
              }}
            >
              Logout
            </TouchableOpacity>
            <FeatherIcon
              style={{ color: 'white', height: height * 0.025 }}
              accessible={true}
              accessibilityLabel='A logout icon'
              accessibilityHint='Click to logout your current account and navigate you back to the Login Screen.'
              icon='log-out'
              onClick={async () => {
                await AsyncStorage.removeItem('token')
                navigate('Login')
              }}
            />
          </View>
        </View>)
    }),
  }
);


// export default App;
const App = createAppContainer(navigator);

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  viewIconText: {
    flexDirection: 'row',
    marginHorizontal: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: 'white'
  },
  textWithIcon: {
    color: 'white',
    marginHorizontal: 7
  },
  navigationText: {
    color: 'white',
    marginHorizontal: 15,
    padding: 8,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 4,
    alignItems: 'center'
  }
})

export default () => {
  return (
    // Wrap into WebContext's Provider
    <Provider>
      <App ref={(navigator) => { setNavigator(navigator) }} />
    </Provider>
  )
}
