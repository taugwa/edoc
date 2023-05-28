import React, { useContext,useEffect, useState } from 'react';
import { AppContext } from './AppContext';

const SearchSubSidebar = () => {
  const { content, updateContent } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
 // const { content, updateContent } = useContext(AppContext);
  const [notes, setNotes] = useState([]);
 // const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await fetch(`http://localhost:3000/notes/${content.Username}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
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

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    updateContent({ searchTerm }); 
  };

  return (
    <div className="subsidebar">
      <form>
        <input
          type="text"
          className="search-subsidebar"
          value={searchTerm}
          onChange={handleSearchInputChange}
          placeholder="Search notes..."
        />
      </form>
      <div className="search-results">
        {notes
          .filter((note) =>
            note.Title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((note) => (
            <div key={note.id} className="note-item">
              <span>{note.Title}</span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchSubSidebar;
