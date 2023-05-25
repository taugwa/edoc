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
    fetch("http://localhost:3000/notes", {
      method: "GET",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "notes");
        setNotes(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleNewNoteClick = (event) => {
    event.preventDefault();
    updateContent({ page: Note });
  };

  const handleSearchClick = (event) => {
    event.preventDefault();
    updateContent({
      searchSubSidebar: !content.searchSubSidebar,
      bookmarksSubSidebar: false,
    });
  };

  const handleBookmarksClick = (event) => {
    event.preventDefault();
    updateContent({
      bookmarksSubSidebar: !content.bookmarksSubSidebar,
      searchSubSidebar: false,
    });
  };

  return (
    <div className='sidebar'>
      <LogoTitle />
      <div className="notesapp-sidebar-profile">
        <img
          src={defaultProfilePicture}
          alt="Default Profile Picture"
          style={{ width: "38px", paddingRight: "10px" }}
        />
        <span className="notesapp-sidebar-profile-userName">{props.Username}</span>
      </div>
      <div className="">
        <button
          onClick={handleSearchClick}
          className="notesapp-sidebar-function-label"
        >
          <img
            src={searchIcon}
            alt=""
            style={{ width: "19px", paddingRight: "15px" }}
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
            style={{ width: "19px", paddingRight: "15px" }}
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
            style={{ width: "19px", paddingRight: "15px" }}
          />
          New note
        </button>
      </div>

      <div className='sidebarfolders'>
        {notes.map((note) => (
          <div key={note._id}>{note.Title}</div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
