import createWebContext from './createWebContext';

const webReducer = (state, action) => {
  switch (action.type) {
    case 'on_submit':
      const submit = async () => {
        const reqOption = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: state.username, password: state.password })
        };
        try {
          let resp = await fetch('/login', reqOption).then(data => data.json())
          return {...state, success: resp.success};
        } catch (error) {
          console.log(`Error:${error}`);
        }
      };
      submit();
      // return submit();
      return {...state, success: true}; // This I hard code to make it work, originally i wanna return submit()
    case 'set_username':
      return { ...state, username: action.username };
    case 'set_password':
      return { ...state, password: action.password };
    default:
      return state;
  }
};

const onSubmit = dispatch => {
  return (success, callback) => {
    dispatch({ type: 'on_submit', success: success})
    if (callback) {
      return callback();
    }
  }
}

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
  { setUserName, onSubmit, setPassword },
  { username: '', password: '', success: false }
)
