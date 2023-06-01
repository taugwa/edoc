import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import bookmarkIcon from './images/bookmark.png';

const Toolbar = () => {
  const { content, updateContent } = useContext(AppContext);

  const handleBookmarkClick = () => {
    const { selectedNote, bookmarks } = content;
    console.log("bookmark icon clicked");
  
    if (selectedNote) {
      const isBookmarked = bookmarks.some((note) => note.NoteID === selectedNote.NoteID);
  
      if (isBookmarked) {
        // Remove bookmark
        const updatedBookmarks = bookmarks.filter((note) => note.NoteID !== selectedNote.NoteID);
        updateContent({ bookmarks: updatedBookmarks });
      } else {
        // Add bookmark
        const updatedBookmarks = [...bookmarks, selectedNote];
        updateContent({ bookmarks: updatedBookmarks });
      }
    }
  };
  
  return (
    <div>
      <button className="toolbar-button" 
      onClick={handleBookmarkClick}>
        <img src={bookmarkIcon} 
        className="toolbar-button-img" alt="Bookmark" />
      </button>
    </div>
  );
};

export default Toolbar;
