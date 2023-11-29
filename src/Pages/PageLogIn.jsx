import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSnapshot } from 'mobx-state-tree';

import { isLogin, user } from '../storage';

function PageLogIn() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus, setLoginStatus] = useState('');

  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (login === 'aaa' && password === 'aaa') {
      isLogin.setTrue();
      user.setName(login);
      setLogin('');
      setPassword('');
      setLoginStatus('');
      navigate('/');
    } else {
      setLoginStatus('Invalid login or password');
    }
  };

  const handleLogout = () => {
    isLogin.setFalse();
    user.setName('');
    navigate('/log-in');
  };

  return (
    <div className="container">
      <div className="s-60"></div>
      {getSnapshot(isLogin).state ? (
        <>
          <h2>User: {getSnapshot(user).name}</h2>
          <div className="s-40"></div>
          <button className="button" onClick={handleLogout}>
            Log out
          </button>
        </>
      ) : (
        <form className="login">
          <input
            placeholder="login"
            type="text"
            value={login}
            onChange={handleLoginChange}
            autoComplete="username"
            required
          />
          <div className="s-10"></div>
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
            required
          />
          <div className="s-40"></div>
          <button className="button" onClick={handleLogin}>
            Log in
          </button>
          <div className="s-10"></div>
          <p className="c-red">{loginStatus}</p>
        </form>
      )}
    </div>
  );
}

export default PageLogIn;
