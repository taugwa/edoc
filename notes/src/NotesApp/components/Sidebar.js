import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import LogoTitle from './LogoTitle';
import defaultProfilePicture from './images/defaultpfp.png';
import searchIcon from './images/search.png';
import plusIcon from './images/plus.png';
import bookmarkIcon from './images/bookmark.png';
import documentIcon from './images/document.png';
import { Link } from 'react-router-dom';
import folderIcon from './images/folder.png';

const Sidebar = ({ Username }) => {
  const { content, updateContent } = useContext(AppContext);
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [draggedNote, setDraggedNote] = useState(null);
  const folderList = content.folders || [];


  useEffect(() => {
    fetchUserNotes();
    // Poll for note updates every 5 seconds
    const interval = setInterval(() => {
      fetchUserNotes();
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, [Username]);

  const fetchUserNotes = async () => {
    if (Username) {
      try {
        const [notesResponse, foldersResponse] = await Promise.all([
          fetch(`http://localhost:3000/notes/${Username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }),
          fetch(`http://localhost:3000/folders/${Username}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          }),
        ]);
  
        if (notesResponse.ok) {
          const notesData = await notesResponse.json();
          setNotes(notesData);
          setDraggedNote(null);
        } else {
          console.error('Error:', notesResponse.statusText);
        }
  
        if (foldersResponse.ok) {
          const foldersData = await foldersResponse.json();
          updateContent({
            folders: foldersData,
          });
        } else {
          console.error('Error:', foldersResponse.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  const handleNewNoteClick = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          Username: Username,
          Title: '',
          Body: '',
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const { status, message, noteUrl } = data;

        if (status === 'success') {
          console.log(message);
          // Redirect the user to the new note page
          const newNoteId = noteUrl.split('/').pop(); // Extract the unique ID from the note URL
          window.history.pushState(null, '', `/notes/${Username}/${newNoteId}`);
          // Trigger a navigation event to update the UI
          window.dispatchEvent(new Event('popstate'));
        } else {
          console.error(message);
        }
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleFolderClick = async (folder) => {
    try {
      console.log("handlefolderchlick");
       const response = await fetch(`http://localhost:3000/folders/${Username}/${folder._id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        updateContent({
          selectedFolder: data,
        });
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleDrop = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const noteId = event.dataTransfer.getData('text/plain');
    const targetNoteId = draggedNote?._id;
  
    if (noteId !== targetNoteId) {
      const note = notes.find((note) => note._id === noteId);
      const targetNote = notes.find((note) => note._id === targetNoteId);
  
      if (note && targetNote) {
        const newFolder = {
          Title: `${targetNote.Title} + ${note.Title}`,
          notes: [targetNote, note],
        };
  
        try {
          const response = await fetch(`http://localhost:3000/folders/${Username}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify(newFolder),
          });
  
          if (response.ok) {
            const data = await response.json();
            const { folderId } = data;
  
            // Update the state with the new folder including the generated ID
            updateContent({
              folders: [...folderList, { _id: folderId, ...newFolder }],
            });
  
            // Update the notes state to remove the merged notes
            const updatedNotes = notes.filter(
              (note) => note._id !== noteId && note._id !== targetNoteId
            );
            setNotes(updatedNotes);
          } else {
            console.error('Error:', response.statusText);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      }
    }
  };
  
  
  const filteredNotes = notes.filter((note) =>
    note.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const onDragStart = (event, note) => {
    event.stopPropagation();
    event.dataTransfer.setData('text/plain', note._id);
    setDraggedNote(note);
  };
  
  return (
    <div className="sidebar">
      <div className="sidebar-fixed">
        <LogoTitle />
        <div className="notesapp-sidebar-profile">
          <img
            src={defaultProfilePicture}
            alt="Default Profile Picture"
            style={{ width: '38px', paddingRight: '10px' }}
          />
          <span className="notesapp-sidebar-profile-userName">{Username}</span>
        </div>
        <div className="">
          <button
            onClick={() =>
              updateContent({
                searchSubSidebar: !content.searchSubSidebar,
                bookmarksSubSidebar: false,
              })
            }
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
            onClick={() =>
              updateContent({
                bookmarksSubSidebar: !content.bookmarksSubSidebar,
                searchSubSidebar: false,
              })
            }
            className="notesapp-sidebar-function-label"
          >
            <img
              src={bookmarkIcon}
              alt="Bookmarks"
              style={{ width: '19px', paddingRight: '15px' }}
            />
            Bookmarks
          </button>

          <Link
            to="#"
            style={{ textDecoration: 'none', color: 'black' }}
            onClick={handleNewNoteClick}
            className="notesapp-sidebar-function-label"
          >
            <img
              src={plusIcon}
              alt="New Note"
              style={{ width: '19px', paddingRight: '15px' }}
            />
            New Note
          </Link>

          {(
            <div className="notesapp-sidebar-folders">
  {folderList.map((folder) => (
    <button
      key={folder._id}
      className={
        folder._id === content.selectedFolder?._id
          ? 'notesapp-sidebar-folder-active'
          : 'notesapp-sidebar-folder'
      }
      onClick={() => handleFolderClick(folder)}
    >
      <img
        src={folderIcon}
        alt="Folder"
        style={{ width: '16px', paddingRight: '5px' }}
      />
      {folder.Title}
    </button>
  ))}
</div>
)}
          <div className="notesapp-sidebar-notes">
            <div
              className="notesapp-sidebar-notes-list"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              {filteredNotes.map((note) => (
                <Link
                  key={note._id}
                  to={`/notes/${Username}/${note._id}`}
                  className="notesapp-sidebar-note"
                  draggable = {true}
                  onDragStart={(e) => onDragStart(e, note)}
                  style={{ textDecoration: 'none', color: 'black', display:'block' }}
                >
                  <img
                src={documentIcon}
                alt="Note"
                style={{ width: '19px', paddingRight: '15px' }}
              />
                   {note.Title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

