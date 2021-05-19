import createWebContext from './createWebContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { navigate } from '../navigationRef';

const webReducer = (state, action) => {
  switch (action.type) {
    case 'set_username':
      return { ...state, username: action.username };
    case 'set_password':
      return { ...state, password: action.password };
    case 'set_register_username':
      return { ...state, registerUsername: action.registerUsername };
    case 'set_register_password':
      return { ...state, registerPassword: action.registerPassword };
    case 'set_comfirm_password':
      return { ...state, comfirmPassword: action.comfirmPassword };
    case 'set_email':
      return { ...state, registerEmail: action.registerEmail }
    case 'login':
      return { ...state, token: action.token };
    case 'get_token':
      return { ...state, username: action.username, token: action.token, rememberMe: action.rememberMe };
    case 'logout':
      return { ...state, token: null, rememberMe: action.rememberMe, username: action.username };
    case 'toggle_remember':
      return { ...state, rememberMe: action.rememberMe };
    case 'chooseFile':
      return { ...state, uploadFile: [...state.uploadFile, action.uploadFile] };
    case 'get_images':
      return { ...state, images: action.images }
    default:
      return state;
  }
};
const setRegisterUserName = dispatch => {
  return (registerUsername) => {
    dispatch({ type: 'set_register_username', registerUsername: registerUsername });
  };
};

const setRegisterPassword = dispatch => {
  return (registerPassword) => {
    dispatch({ type: 'set_register_password', registerPassword: registerPassword });
  };
};

const setComfirmPassword = dispatch => {
  return (comfirmPassword) => {
    dispatch({ type: 'set_comfirm_password', comfirmPassword: comfirmPassword });
  };
};

const setUserName = dispatch => {
  return async (username) => {
    dispatch({ type: 'set_username', username: username });
  };
};

const setPassword = dispatch => {
  return (password) => {
    dispatch({ type: 'set_password', password: password });
  };
};

const setEmail = dispatch => {
  return (email) => {
    dispatch({ type: 'set_email', registerEmail: email });
  };
};

const login = dispatch => {
  return async (username, password, rememberMe) => {
    const reqOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    try {
      await AsyncStorage.clear();
      let resp = await fetch('/login', reqOption).then(data => data.json());
      if (resp.success) {
        if (rememberMe) {
          await AsyncStorage.setItem('token', resp.data.token)
          await AsyncStorage.setItem('remember', rememberMe)
          await AsyncStorage.setItem('username', resp.data.username)
        }
      }

      dispatch({ type: 'login', token: resp.data.token })
      return resp.success ? navigate('Home') : alert('Incorrect username or password.');
    } catch (error) {
      alert('Incorrect username or password.')
      console.log(`Error: ${error}`);
    }
  };
};

const getToken = dispatch => {
  return async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const remember = await AsyncStorage.getItem('remember');
      const username = await AsyncStorage.getItem('username');

      if (token) {
        dispatch({ type: 'get_token', token: token, username: username, rememberMe: true })
        navigate('Home')
      } else {
        if (remember === "true") {
          dispatch({ type: 'logout', rememberMe: true, username: username })
        } else {
          await AsyncStorage.removeItem('remember')
          await AsyncStorage.removeItem('username')
          dispatch({ type: 'logout', rememberMe: false, username: '' })
        }

      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

const toggleRememberMe = dispatch => {
  return (remember) => {
    const opposite = !remember;
    dispatch({ type: 'toggle_remember', rememberMe: opposite })
  }
}

const chooseFile = dispatch => {
  return (name) => {
    dispatch({ type: 'chooseFile', uploadFile: name })
  }
}

const getImages = dispatch => {
  return (images) => {
    dispatch({ type: 'get_images', images: images })
  }
}

export const { Context, Provider } = createWebContext(
  webReducer,
  { setUserName, setPassword, setRegisterUserName, setRegisterPassword, setComfirmPassword, setEmail, login, getToken, toggleRememberMe, chooseFile, getImages },
  { username: '', password: '', registerEmail: '', registerUsername: '', registerPassword: '', comfirmPassword: '', rememberMe: false, token: null, uploadFile: [], images: [] }
);
