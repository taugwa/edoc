import React, { createContext, useState, useEffect } from 'react';
import HiUser from '../functions/HiUser';

// Create the context
export const AppContext = createContext();

// Create the context provider
export const AppProvider = ({ children }) => {
  const [content, setContent] = useState({
    page: HiUser,
    Username: '',
    searchSubSidebar: false,
    bookmarksSubSidebar: false,
    bookmarks: [],
    folders: [],
    selectedNote: {
      NoteId: '',
      Title: '',
      Body: '',
    },
  });

  useEffect(() => {
    // Retrieve bookmarks and selected note from local storage and update the state
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
    // Store bookmarks in local storage whenever it changes
    localStorage.setItem('bookmarks', JSON.stringify(content.bookmarks));
  }, [content.bookmarks]);

  useEffect(() => {
    // Store selected note in local storage whenever it changes
    localStorage.setItem('selectedNote', JSON.stringify(content.selectedNote));
  }, [content.selectedNote]);

  return (
    <AppContext.Provider value={{ content, updateContent }}>
      {children}
    </AppContext.Provider>
  );
};
