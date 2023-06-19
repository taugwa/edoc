import React, { createContext, useState } from 'react';
import HiUser from '../functions/HiUser'
import Note from '../functions/NoteView';

// Create the context
export const AppContext = createContext();

// Create the context provider
export const AppProvider = ({ children }) => {
  const [content, setContent] = useState({ 
    page: HiUser,
    Username: "",
    searchSubSidebar: false,
    bookmarksSubSidebar: false,
    notes: [], 

    selectedNote: {
      NoteID: "", 
      Title: "",
      Body: ""
    },
  });

  const updateContent = (newContent) => {
    setContent({ ...content, ...newContent });
  };

  return (
    <AppContext.Provider value={{ content, updateContent }}>
      {children}
    </AppContext.Provider>
  );
};
