import {createContext, useState} from 'react';

export const ContextApi = createContext();

const Context = ({children}) => {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const [success, setSuccess] = useState(false);

  return (
    <ContextApi.Provider
      value={{
        signupData,
        setSignupData,
        loginData,
        setLoginData,
        success,
        setSuccess,
      }}>
      {children}
    </ContextApi.Provider>
  );
};

export default Context;
