import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from './AppContext';
import { Link, useNavigate } from 'react-router-dom';
import documentIcon from './images/document.png';

const SearchSubSidebar = () => {
  const { content, updateContent } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserNotes = async () => {
      try {
        const response = await fetch(`https://edoc-api.vercel.app/notes/${content.Username}`, {
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

  const handleSearchInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    updateContent({ searchTerm });
  };

  const handleSearchNoteClick = (selectedNote) => {
    const { _id, Title, Body } = selectedNote;
    navigate(`/notes/${content.Username}/${_id}`); 
    updateContent({
      selectedNote: {
        NoteId: _id,
        Title,
        Body,
      },
    });
  };

  const filteredNotes = notes.filter((note) =>
    note.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="subsidebar">
      <div className='sidebar-fixed'>
        <form>
          <input
            type="text"
            className="searchbar-subsidebar"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search notes..."
          />
        </form>
      </div>

      <div className="search-sidebarnotes-container">
      <div className="search-sidebarnotes">
        {filteredNotes.map((note) => (
          <div
            className="sidebarnotes-allbuttons"
            key={note._id}
            onClick={() => handleSearchNoteClick(note)}
          >
            <Link
              to={`/notes/${content.Username}/${note._id}`}
              className="sidebarnotes-button"
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <img
                src={documentIcon}
                alt="Note"
                style={{ width: '19px', paddingRight: '15px' }}
              />
              {note.Title}
            </Link>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default SearchSubSidebar;
