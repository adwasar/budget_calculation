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

    if (login === 'testLogin22' && password === 's#dDA23@44#Ds') {
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
      <h1>PageLogIn</h1>
      {getSnapshot(isLogin).state ? (
        <>
          <h2>User: {getSnapshot(user).name}</h2>
          <button onClick={handleLogout}>Log out</button>
        </>
      ) : (
        <form>
          <input
            placeholder="login"
            type="text"
            value={login}
            onChange={handleLoginChange}
            autoComplete="username"
            required
          />
          <br />
          <input
            placeholder="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
            required
          />
          <br />
          <button onClick={handleLogin}>Log in</button>
          <p>{loginStatus}</p>
        </form>
      )}
    </div>
  );
}

export default PageLogIn;
