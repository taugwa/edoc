import React, { useContext,useEffect, useState } from 'react';
import { AppContext } from './AppContext';

import documentIcon from './images/document.png';


const SearchSubSidebar = ({Username}) => {
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

  const handleSearchNoteClick = (searchNoteTitle) => {
    console.log("clicked");
    const selectedNote = notes.find((note) => note.Title === searchNoteTitle.Title);
    console.log(selectedNote._id)
    if (selectedNote) {
      updateContent({ 
        selectedNote: { 
          NoteID: selectedNote._id,
          Title: selectedNote.Title, 
          Body: selectedNote.Body } });
    } else {
      console.error('Note not found:', searchNoteTitle);
    }
  };
  const filteredNotes = notes.filter((note) =>
  note.Title.toLowerCase().includes(searchTerm.toLowerCase())
);
 

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
      {/* <div className="search-results">
        {notes
          .filter((note) =>
            note.Title.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((note) => (
            <div key={note.id} className="note-item">
              <span>{note.Title}</span>
            </div>
          ))}
      </div> */}
       <div className="sidebarnotes">
        {filteredNotes.map((note) => (
          <div
            className="sidebarnotes-allbuttons"
            key={note._id}
            onClick={() => handleSearchNoteClick(note)}
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

export default SearchSubSidebar;
