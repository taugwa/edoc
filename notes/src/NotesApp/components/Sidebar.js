import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import LogoTitle from './LogoTitle';
import defaultProfilePicture from './images/defaultpfp.png';
import searchIcon from './images/search.png';
import plusIcon from './images/plus.png';
import bookmarkIcon from './images/bookmark.png';
import documentIcon from './images/document.png';

import Note from '../functions/NoteView';

const Sidebar = () => {
  const { content, updateContent } = useContext(AppContext);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/notes/${content.Username}`, {
          method: 'GET',
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

  const handleNoteClick = (selectedNote) => {
    updateContent({
      page: Note,
      selectedNote: {
        NoteID: selectedNote._id,
        Title: selectedNote.Title,
        Body: selectedNote.Body,
      },
    });
  };

  const handleNewNoteClick = (event) => {
    event.preventDefault();
    updateContent({
      page: Note,
      selectedNote: { Title: '', Body: '' },
      content: { Username: content.Username },
    });
  };

  const filteredNotes = notes.filter((note) =>
  note.Title.toLowerCase().includes(searchTerm.toLowerCase())
);
 
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
          onClick={() => updateContent({ searchSubSidebar: !content.searchSubSidebar, bookmarksSubSidebar: false })}
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
          onClick={() => updateContent({ bookmarksSubSidebar: !content.bookmarksSubSidebar, searchSubSidebar: false })}
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

      <div className="sidebarnotes">
        {filteredNotes.map((note) => (
          <div
            className="sidebarnotes-allbuttons"
            key={note._id}
            onClick={() => handleNoteClick(note)}
          >
            <button className="sidebarnotes-button">
              <img
                src={documentIcon}
                alt="Note"
                style={{ width: '19px', paddingRight: '15px' }}
              />
              {note.Title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
