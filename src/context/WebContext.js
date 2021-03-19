import createWebContext from './createWebContext';

const webReducer = (state, action) => {
  switch (action.type) {
    case 'set_username':
      return { ...state, username: action.username };
    case 'set_password':
      return { ...state, password: action.password };
    default:
      return state;
  }
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

export const { Context, Provider } = createWebContext(
  webReducer,
  { setUserName, setPassword },
  { username: '', password: '' }
)
