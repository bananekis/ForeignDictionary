import React, {useEffect, useState} from 'react';

export const LoginForm = (props) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const defaultUser = props.defaultUser;
    const isLoggedIn = props.isLoggedIn;
    const onLogin = props.onLogin;

    const handleUserName = (event) => {
        const value = event.currentTarget.value;

        setUsername(value);
    };

    const handlePassword = (event) => {
        const value = event.currentTarget.value;

        setPassword(value);
    };

    const handleSignIn = () => {
        if (username !== defaultUser.name || password !== defaultUser.password) {
            return;
        }

        setUsername('');
        setPassword('');
        onLogin();
    };

    if (isLoggedIn) {
        return props.children;
    }

    return (
      <>
      <div className={"row u-center-div "}>
          <div className={"col-1-of-3 form-group form-group--empty"}>
            <span>Username</span>
            <input type="text" value={username} onChange={handleUserName} className="form-field form-field--special" />
          </div>

          <div className={"col-1-of-3 form-group form-group--empty"}>
            <span>Password</span>
            <input type="password" value={password} onChange={handlePassword} className="form-field form-field--special" />
          </div>

        <div className={"col-1-of-3"}>
          <button onClick={handleSignIn} className={"btn btn--add"}>Sign in</button>
        </div>
      </div>
      </>
    );
};