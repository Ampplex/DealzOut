import React, { useState, useEffect } from "react";
import RegistrationInfo_Context from "./RegistrationInfo_Context";

const RegistrationInfo_State = (props: any) => {
  const [id, setId] = useState<string>("");
  const [first_name, setFirstName] = useState<string>("");
  const [last_name, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [PanCardNo, setPanCardNo] = useState<string>("");

  const setDetails = (id, first_name, last_name, email, phoneNo, PanCardNo) => {
    setId(id);
    setFirstName(first_name);
    setLastName(last_name);
    setEmail(email);
    setPhoneNo(phoneNo);
    setPanCardNo(PanCardNo);
  };

  return (
    <RegistrationInfo_Context.Provider
      value={{
        id,
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
