import React, { createContext, useState ,useEffect} from 'react';
import HiUser from '../functions/HiUser'
// Create the context
export const AppContext = createContext();

// Create the context provider
export const AppProvider = ({ children }) => {

  const [content, setContent] = useState({ 
    page: HiUser,
    Username: "",
    searchSubSidebar: false,
    bookmarksSubSidebar: false,   
    bookmarks: [] ,

    selectedNote: {
      NoteId: "", 
      Title: "",
      Body: ""
    },
    

    
  });
  useEffect(() => {
    // Retrieve bookmarks from local storage and update the state
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      setContent((prevContent) => ({
        ...prevContent,
        bookmarks: JSON.parse(storedBookmarks),
      }));
    }
  }, []);

  useEffect(() => {
    // Store bookmarks in local storage whenever it changes
    localStorage.setItem('bookmarks', JSON.stringify(content.bookmarks));
  }, [content.bookmarks]);

  const updateContent = (newContent) => {
    setContent({ ...content, ...newContent });
  };

  return (
    <AppContext.Provider value={{ content, updateContent }}>
      {children}
    </AppContext.Provider>
  );
};