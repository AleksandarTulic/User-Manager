// MyContext.js
import React, { createContext, useEffect, useRef, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [flagShow, setFlagShow] = useState(0);
  const [message, setMessage] = useState("Success");
  const [messageType, setMessageType] = useState(1);

  return (
    <MyContext.Provider value={{ flagShow, setFlagShow, message, setMessage, messageType, setMessageType }}>
      {
        children
      }
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };