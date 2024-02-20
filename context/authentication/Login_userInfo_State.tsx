import React, { useState } from "react";
import Login_userInfo from "./Login_userInfo";

const Login_userInfo_State = (props: any) => {
  const [userID, setUserID] = useState<string | null>("");

  const changeLoginedUserID = (param_userID: string) => {
    setUserID(param_userID);
  };

  return (
    <Login_userInfo.Provider value={{ userID, changeLoginedUserID }}>
      {props.children}
    </Login_userInfo.Provider>
  );
};

export default Login_userInfo_State;
