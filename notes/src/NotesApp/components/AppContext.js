import React, { createContext, useState, useEffect } from 'react';
import HiUser from '../functions/HiUser';

// Create the context
export const AppContext = createContext();

// Create the context provider
export const AppProvider = ({ children }) => {
  const [content, setContent] = useState({
    PageType: "HiUser",
    Username: '',
    searchSubSidebar: false,
    bookmarksSubSidebar: false,
    bookmarks: [],
    selectedNote: {
      NoteId: '',
      Title: '',
      Body: '',
    },
    isLoggedIn: false,
  });

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    const storedSelectedNote = localStorage.getItem('selectedNote');

    if (storedBookmarks) {
      setContent((prevContent) => ({
        ...prevContent,
        bookmarks: JSON.parse(storedBookmarks),
      }));
    }

    if (storedSelectedNote) {
      setContent((prevContent) => ({
        ...prevContent,
        selectedNote: JSON.parse(storedSelectedNote),
      }));
    }
  }, []);

  const updateContent = (newContent) => {
    setContent((prevContent) => ({
      ...prevContent,
      ...newContent,
    }));
  };

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(content.bookmarks));
  }, [content.bookmarks]);

  useEffect(() => {
    localStorage.setItem('selectedNote', JSON.stringify(content.selectedNote));
  }, [content.selectedNote]);

  return (
    <AppContext.Provider value={{ content, updateContent }}>
      {children}
    </AppContext.Provider>
  );
};
