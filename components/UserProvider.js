import React, {useState, useEffect} from 'react';
import { UserContext } from './UserContext';
import NetInfo from '@react-native-community/netinfo';


const UserProvider = ({ children }) => {
    const [loginState, setLoginState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [myDetails, setMyDetails] = useState({});
    const [userOtpCode, setUserOtpCode] = useState({});
    const [userRegCode, setUserRegCode] = useState({});
    const [userRegEmail, setUserRegEmail] = useState({});
    const [userRecentData, setUserRecentData] = useState([]);
    const [userRegId, setUserRegId] = useState({});
    const [messageNotice, setMessageNotice] = useState(false);
  
    // const updateState = (newValue) => {
    //   setMyState(newValue);
    // };
  
    return (
      <UserContext.Provider value={[ loginState, setLoginState, isLoading, setIsLoading, myDetails, setMyDetails, userRegCode, setUserRegCode, userRegEmail, setUserRegEmail, messageNotice, setMessageNotice, userRegId, setUserRegId]}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export default UserProvider;