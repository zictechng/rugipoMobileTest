import React, { useState } from 'react';
import { UserContext } from './UserContext';


const UserProvider = ({ children }) => {
    const [loginState, setLoginState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [myDetails, setMyDetails] = useState({});
    const [userRegCode, setUserRegCode] = useState(null);
  
    // const updateState = (newValue) => {
    //   setMyState(newValue);
    // };
  
    return (
      <UserContext.Provider value={[ {loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails,
        userRegCode, setUserRegCode }]}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;