import React, {useEffect} from 'react';
import './App.css';
import {LoginForm} from "./LoginForm";
import {Main} from "./Main";
import {Actions} from "./reducers/rootReducer";
import {useDispatch, useSelector} from 'react-redux';

const defaultUser = {
    name: 'admin',
    password: 'admin',
};

export const App = () => {
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        const value = JSON.parse(window.localStorage.getItem('isLoggedIn'));
        dispatch({
          type: Actions.IsSignedInLoaded,
          payload: { isLoggedIn: value },
        })
    }, []);

    const onLogin = () => {
      dispatch({ type: Actions.SignIn });
      window.localStorage.setItem('isLoggedIn', JSON.stringify(true));
    };

    const onLogout = () => {
        dispatch({ type: Actions.SignOut });
        window.localStorage.setItem('isLoggedIn', JSON.stringify(false));
    };

    return (
      <LoginForm onLogin={onLogin} isLoggedIn={isLoggedIn} defaultUser={defaultUser}>
        <Main onLogout={onLogout} />
      </LoginForm>
  );
};
