import React, { useContext } from 'react';
import { AppContext } from './AppContext';
import { useNavigate } from 'react-router-dom';
import bookmarkIcon from './images/bookmark.png';
import bookmarkFilledIcon from './images/bookmarkFilled.png';
import trashIcon from './images/trash.png';


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

  const handleDeleteNoteClick = async () => {
    console.log("deletenote" + content.Username + content.selectedNote.NoteId )
    
    try {
      const response = await fetch(`https://edoc-api.vercel.app/notes/${content.Username}/${content.selectedNote.NoteId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
 
      }) 
      if (response.ok) {
        alert(`note ${content.selectedNote.NoteId} successfully deleted`);
        window.location.href = `/Welcome`

      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
    
  };



  

  return (
    <div className='toolbar'>
      <button className="toolbar-button" onClick={handleBookmarkClick}>
        <img src={isBookmarked ? bookmarkFilledIcon : bookmarkIcon} className="toolbar-button-img" alt="Bookmark" />
      </button>
      <button className="toolbar-button" onClick={handleDeleteNoteClick}>
        <img src={trashIcon} className="toolbar-button-img" alt="Bookmark" />
      </button>
      <div className="logout-button-container">
        <button className="logout-button" onClick={handleLogoutClick}>Log out</button>
      </div>
      
    </div>
  );

};

export default Toolbar;
