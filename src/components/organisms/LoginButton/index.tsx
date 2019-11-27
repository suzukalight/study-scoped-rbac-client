import React from 'react';

import { useAuth } from '../../contexts/Auth';
import { writer1, writer2, manager, admin } from '../../../rules/dummy-users';

const Login = () => {
  const { authenticated, login, logout } = useAuth();

  if (authenticated)
    return (
      <button className="btn btn-sm btn-primary" onClick={() => logout()}>
        Logout
      </button>
    );

  return (
    <div>
      <button onClick={() => login(writer1.email, 'password', writer1)}>Writer 1 Login</button>
      <button onClick={() => login(writer2.email, 'password', writer2)}>Writer 2 Login</button>
      <button onClick={() => login(manager.email, 'password', manager)}>Team Manager Login</button>
      <button onClick={() => login(admin.email, 'password', admin)}>Admin Login</button>
    </div>
  );
};

export default Login;
