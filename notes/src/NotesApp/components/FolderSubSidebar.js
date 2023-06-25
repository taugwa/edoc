import React, { useContext, useEffect } from 'react';
import { AppContext } from './AppContext';
import { Link, useNavigate } from 'react-router-dom';
import documentIcon from './images/document.png';

function FolderSubSidebar() {
  const { content, updateContent } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the notes for the selected folder when the component mounts
    fetchFolderNotes();

    // Clean up when the component unmounts
    return () => {
      updateContent({
        selectedFolder: null,
        folderNotes: [],
      });
    };
  }, []);

  const handleFolderClick = async (folder) => {
    if (content.selectedFolder && content.selectedFolder._id === folder._id) {
      // If the clicked folder is already selected, deselect it
      updateContent({
        selectedFolder: folder,
      });
    } else {
      // Fetch the note titles for the selected folder
      try {
        const response = await fetch(`http://localhost:3000/folders/${folder._id}/notes`, {
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
            selectedFolder: folder,
            folderNotes: data,
          });
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  const fetchFolderNotes = async () => {
    const { selectedFolder } = content;

    if (selectedFolder) {
      try {
        const response = await fetch(`http://localhost:3000/folders/${selectedFolder._id}/notes`, {
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
            folderNotes: data,
          });
        } else {
          console.error('Error:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="subsidebar">
     <h2>Folder: {content.selectedFolder && content.selectedFolder.Title}</h2>
      <div className="subsidebar-notes">
      {content.folders.map((folder) => (
  <div
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
  </div>
))}

      </div>
    </div>
  );
}

export default FolderSubSidebar;
