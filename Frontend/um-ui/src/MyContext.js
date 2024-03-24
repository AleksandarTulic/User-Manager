// MyContext.js
import React, { createContext, useEffect, useRef, useState } from 'react';

const MyContext = createContext();

const MyContextProvider = ({ children }) => {
  const [flagShow, setFlagShow] = useState(0);

  return (
    <MyContext.Provider value={{ flagShow, setFlagShow }}>
      {
        children
      }
    </MyContext.Provider>
  );
};

export { MyContext, MyContextProvider };