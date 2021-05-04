import createWebContext from './createWebContext';

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
    case 'login_submit':
      return {...state, success: action.success};
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
  return (username) => {
    dispatch({ type: 'set_username', username: username });
  };
};

const setPassword = dispatch => {
  return (password) => {
    dispatch({ type: 'set_password', password: password });
  };
};

const loginSubmit = dispatch => {
  return async (username, password) => {
    const reqOption = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    };
    try {
      let resp = await fetch('/login', reqOption).then(data => data.json());
      dispatch({ type: 'login_submit', success: resp.success})
      return resp.success
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }
}

export const { Context, Provider } = createWebContext(
  webReducer,
  { setUserName, setPassword, setRegisterUserName, setRegisterPassword, setComfirmPassword, loginSubmit },
  { username: '', password: '', registerUsername: '', registerPassword: '', comfirmPassword: '', success: false }
);
