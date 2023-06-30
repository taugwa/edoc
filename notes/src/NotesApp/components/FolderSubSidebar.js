import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { Link } from 'react-router-dom';
import documentIcon from './images/document.png';
import folderIcon from './images/folder.png';

const FolderSubsidebar = () => {
  const { content, updateContent } = useContext(AppContext);
  const [folderData, setFolderData] = useState(null);

  useEffect(() => {
    const fetchFolderData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/folders/${content.Username}/${content.selectedFolder._id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setFolderData(data);
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchFolderData();
  }, [content.Username, content.selectedFolder._id]);

  const handleNoteClick = (note) => {
    if (note.isFolder) {
      // If the clicked note is a folder, update the selected folder in the content state
      updateContent({
        selectedFolder: {
          _id: note._id,
          Title: note.Title,
        },
        searchSubSidebar: false,
        bookmarksSubSidebar: false,
      });
    } else {
      // If the clicked note is a regular note, update the selected note in the content state
      updateContent({
        selectedNote: {
          NoteId: note._id,
          Title: note.Title,
          Body: note.Body,
        },
      });
    }
  };
  if (!folderData) {
    return <div>Loading folder data...</div>;
  }

  return (
    <div className="folder-subsidebar">
      <div className="folder-subsidebar-header">
        <img src={folderIcon} alt="Folder" className="folder-subsidebar-icon" />
        <span className="folder-subsidebar-title">{content.selectedFolder.Title}</span>
      </div>
      <div className="folder-subsidebar-notes">
        {folderData.notes.map((note) => (
          <Link
            key={note._id}
            to={`/notes/${content.Username}/${note._id}`}
            className={
              note._id === content.selectedNote.NoteId
                ? 'folder-subsidebar-note-active'
                : 'folder-subsidebar-note'
            }
            onClick={() => handleNoteClick(note)}
          >
            <img src={documentIcon} alt="Note" className="folder-subsidebar-note-icon" />
            <span className="folder-subsidebar-note-title">{note.Title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FolderSubsidebar;
