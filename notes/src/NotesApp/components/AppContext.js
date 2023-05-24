import React, { createContext, useState } from 'react';
import HiUser from '../functions/HiUser'

// Create the context
export const AppContext = createContext();

// Create the context provider
export const AppProvider = ({ children }) => {

  const [content, setContent] = useState({ page: HiUser, userName: "" });
  const updateContent = (newContent) => {
    setContent({ ...content, ...newContent });
  };

  return (
    <AppContext.Provider value={{ content, updateContent }}>
      {children}
    </AppContext.Provider>
  );
};
