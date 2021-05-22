import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import DatabaseScreen from './screens/DatabaseScreen';
import UploadScreen from './screens/UploadScreen';
import RegisterScreen from './screens/RegisterScreen';
import { Provider } from './context/WebContext';
import React from 'react';
import { Text, Dimensions, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import FeatherIcon from 'feather-icons-react';
import { setNavigator } from './navigationRef';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from './navigationRef';
import ResultScreen from './screens/ResultScreen';
import { globalStyle } from './styles/global';
import ForgotPassScreen from './screens/ForgotPassScreen';



const navigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      navigationOptions: () => ({
        header: () => null
      })
    },
    Register: {
      screen: RegisterScreen,
      navigationOptions: () => ({
        title: 'Create account',
        headerRight: () => null,
        headerLeft: () => null
      })
    },
    Home: {
      screen: HomeScreen,
      navigationOptions: () => ({
        title: 'Instructions',
        headerLeft: () => null
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
    Result: {
      screen: ResultScreen,
      navigationOptions: () => ({
        title: 'Results'
      })
    },
    ForgetPassword: {
      screen: ForgotPassScreen,
      navigationOptions: () => ({
        title: 'Reset password',
        headerRight: () => null
      })
    }
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: () => ({
      headerStyle: {
        backgroundColor: 'White'
      },
      headerTintColor: 'Black',
      headerTitle: (props) => (
            <Image style={{width: 200, height: 60 }} source={require('./images/logo.png')}></Image>
            ),
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.viewIconText}>
          <Image style={styles.background} source={require('./images/logo.png')}></Image>

            <FeatherIcon
              cursor='pointer'
              style={{ color: 'white', height: height * 0.025 }}
              icon='home'
              onClick={() => navigate('Home')}
            />
            <TouchableOpacity
              style={{ marginHorizontal: 7 }}
              accessible={true}
              accessibilityLabel='Click me'
              accessibilityHint='Click to navigate to Home Screen where you can learn about the instructions to use the website.'
              onPress={() => navigate('Home')}
            >
              <Text style={globalStyle.buttonText}>
                Home
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.navigationText}
            accessible={true}
            accessiblityLabel='Click me'
            accessibilityHint='Click to navigate to Database Screen where you can download or see the details of the image.'
            onPress={() => navigate('Database')}
          >
            <Text style={globalStyle.buttonText}>
              Database
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.navigationText}
            accessible={true}
            accessibilityLabel='Click me'
            accessibilityHint='Click to navigate to Upload Screen where you can upload your image to be segmented.'
            onPress={() => navigate('Upload')}
          >
            <Text style={globalStyle.buttonText}>
              Upload Image
            </Text>
          </TouchableOpacity>
          <View style={styles.viewIconText}>
            <TouchableOpacity
              style={{ marginHorizontal: 7 }}
              accessible={true}
              accessibilityLabel='Click me'
              accessibilityHint='Click to logout your current account and navigate you back to the Login Screen.'
              onPress={async () => {
                await AsyncStorage.removeItem('token')
                navigate('Login')
              }}
            >
              <Text style={globalStyle.buttonText}>
                Logout
              </Text>
            </TouchableOpacity>
            <FeatherIcon
              cursor='pointer'
              style={{ color: 'white', height: height * 0.025 }}
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
  navigationText: {
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
