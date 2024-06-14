import React, { useState, useEffect } from "react";
import RegistrationInfo_Context from "./RegistrationInfo_Context";

const RegistrationInfo_State = (props: any) => {
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [PanCardNo, setPanCardNo] = useState<string>("");

  const setDetails = (
    first_name,
    last_name,
    email,
    password,
    phoneNo,
    PanCardNo
  ) => {
    setFirstName(first_name);
    setLastName(last_name);
    setEmail(email);
    setPassword(password);
    setPhoneNo(phoneNo);
    setPanCardNo(PanCardNo);
  };

  return (
    <RegistrationInfo_Context.Provider
      value={{
        first_name,
        last_name,
        email,
        phoneNo,
        PanCardNo,
        setDetails,
      }}
    >
      {props.children}
    </RegistrationInfo_Context.Provider>
  );
};

export default RegistrationInfo_State;
