import React, { useEffect, useState } from 'react';

const FolderList = ({ Username }) => {
  const [folders, setFolders] = useState([]);

  useEffect(() => {
    fetchFolders();
  }, [Username]);

  const fetchFolders = async () => {
    try {
      const response = await fetch(`http://localhost:3000/folders/${Username}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setFolders(data);
      } else {
        throw new Error('Error fetching folders');
      }
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  return (
    <div>
      <h2>Folders</h2>
      {folders.map((folder) => (
        <div key={folder._id}>{folder.name}</div>
      ))}
    </div>
  );
};

export default FolderList;
