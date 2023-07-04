import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';
import bookmarkIcon from './images/bookmark.png';
import bookmarkFilledIcon from './images/bookmarkFilled.png';


const Toolbar = () => {
  const navigate = useNavigate();
  const { content, updateContent } = useContext(AppContext);
  const { selectedNote, bookmarks, isLoggedIn } = content;
  const handleLogoutClick = () => {
    localStorage.clear();
    updateContent({ ...content, isLoggedIn: false });
    navigate('/'); 
  };

  const handleBookmarkClick = () => {

    if (selectedNote) {
      const { NoteId, Title, Body } = selectedNote;
      console.log("handle" + selectedNote.NoteId);
      const isBookmarked = bookmarks.some((note) => note.NoteId === NoteId);
      console.log(NoteId);
      console.log(Title);
      console.log(Body);

      if (isBookmarked) {
        // Remove bookmark
        const updatedBookmarks = bookmarks.filter((note) => note.NoteId !== NoteId);
        updateContent({ ...content, bookmarks: updatedBookmarks });
      } else {
        // Add bookmark
        const updatedBookmarks = [...bookmarks, { NoteId, Title, Body }];
        updateContent({ ...content, bookmarks: updatedBookmarks });
      }
    }
  };
  const isBookmarked = selectedNote && bookmarks.some((note) => note.NoteId === selectedNote.NoteId);

  return (
    <div className='toolbar'>
      <button className="toolbar-button" onClick={handleBookmarkClick}>
        <img src={isBookmarked ? bookmarkFilledIcon : bookmarkIcon} className="toolbar-button-img" alt="Bookmark" />
      </button>
      <button className="toolbar-button" onClick={handleLogoutClick}>Logout</button>
    </div>
  );

};

export default Toolbar;
