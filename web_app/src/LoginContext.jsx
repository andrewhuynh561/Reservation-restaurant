import { createContext } from 'react';

const LoginContext = createContext({
    loggedIn: null,
    setLoggedIn: () => {}
  });

export default LoginContext;