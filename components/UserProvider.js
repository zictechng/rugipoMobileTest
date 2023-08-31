import React, { useState } from 'react';
import { UserContext } from './UserContext';


const UserProvider = ({ children }) => {
    const [loginState, setLoginState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [myDetails, setMyDetails] = useState({});
    const [userOtpCode, setUserOtpCode] = useState({});
    const [userRegCode, setUserRegCode] = useState({});
    const [userRegEmail, setUserRegEmail] = useState({});
  
    // const updateState = (newValue) => {
    //   setMyState(newValue);
    // };
  
    return (
      <UserContext.Provider value={[ loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, userRegCode, setUserRegCode, userRegEmail, setUserRegEmail]}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;