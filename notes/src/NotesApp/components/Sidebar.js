import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import LogoTitle from './LogoTitle';
import defaultProfilePicture from './images/defaultpfp.png';
import searchIcon from './images/search.png';
import plusIcon from './images/plus.png';
import bookmarkIcon from './images/bookmark.png';
import Note from '../functions/NoteView';

const Sidebar = (props) => {
  const { content, updateContent } = useContext(AppContext);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/notes/${content.Username}`, {
          method: 'GET',
          crossDomain: true,
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });
        if (response.ok) {
          const data = await response.json();
          setNotes(data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    if (content.Username) {
      fetchUserNotes();
    }
  }, [content.Username]);
  

  const handleSearchClick = (event) => {
    event.preventDefault();
    updateContent({
      searchSubSidebar: !content.searchSubSidebar,
      bookmarksSubSidebar: false,
    });
  };

const handleNoteClick = (noteTitle) => {
    const selectedNote = notes.find((note) => note.Title === noteTitle.Title);
    console.log(selectedNote._id)
    if (selectedNote) {
      updateContent({ 
        page: Note,
        selectedNote: { 
          NoteID: selectedNote._id,
          Title: selectedNote.Title, Body: selectedNote.Body } });
    } else {
      console.error('Note not found:', noteTitle);
    }
  };
  const handleNewNoteClick = (event) => {
    event.preventDefault();
    updateContent({ page: Note, 
      selectedNote: { Title: "", Body: "" } ,
      content: { Username: content.Username } });
  };

  const handleBookmarksClick = (event) => {
    event.preventDefault();
    updateContent({
      bookmarksSubSidebar: !content.bookmarksSubSidebar,
      searchSubSidebar: false,
    });
  };
 
  return (
    <div className="sidebar">
      <LogoTitle />
      <div className="notesapp-sidebar-profile">
        <img
          src={defaultProfilePicture}
          alt="Default Profile Picture"
          style={{ width: '38px', paddingRight: '10px' }}
        />
        <span className="notesapp-sidebar-profile-userName">
          {content.Username}
        </span>
      </div>
      <div className="">
        <button
          onClick={handleSearchClick}
          className="notesapp-sidebar-function-label"
        >
          <img
            src={searchIcon}
            alt=""
            style={{ width: '19px', paddingRight: '15px' }}
          />
          Search
        </button>

        <button
          onClick={handleBookmarksClick}
          className="notesapp-sidebar-function-label"
        >
          <img
            src={bookmarkIcon}
            alt="Bookmarks"
            style={{ width: '19px', paddingRight: '15px' }}
          />
          Bookmarks
        </button>

        <button
          onClick={handleNewNoteClick}
          className="notesapp-sidebar-function-label"
        >
          <img
            src={plusIcon}
            alt="New Note"
            style={{ width: '19px', paddingRight: '15px' }}
          />
          New note
        </button>
      </div>

      <div className="sidebarfolders">
      {notes.map((note) => (
  <div key={note._id} onClick={() => handleNoteClick(note)}>
    {note.Title}
  </div>
))}
      </div>
    </div>
  );
};

export default Sidebar;