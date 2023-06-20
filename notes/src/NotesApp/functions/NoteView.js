import React, { useContext, useState, useEffect } from 'react';
import { InputBase } from '@mui/material';
import { styled } from '@mui/system';
import { AppContext } from '../components/AppContext';

const StyledInputBaseTitle = styled(InputBase)(({ theme }) => ({
  fontFamily: theme.typography.heading1.fontFamily,
  fontSize: '50px',
  fontWeight: 'bold',
  width: '800px',
  paddingRight: '10px',
}));

const Note = () => {
  const { content, updateContent } = useContext(AppContext);
  const [NoteId, setNoteID] = useState('');
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');

  useEffect(() => {
    if (content.selectedNote) {
      setNoteTitle(content.selectedNote.Title || '');
      setNoteBody(content.selectedNote.Body || '');
      setNoteID(content.selectedNote.NoteId || '' )
    } else {
      setNoteTitle('');
      setNoteBody('');
      setNoteID('');
    }
  }, [content.selectedNote]);

  const handleChangeNoteTitle = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleChangeNoteBody = (event) => {
    setNoteBody(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { Username } = content;
    const token = localStorage.getItem('token');
    fetch('http://localhost:3000/notes', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Username,
        NoteId: NoteId,
        Title: noteTitle,
        Body: noteBody,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          alert('Note submitted!');

        } else if (data.status === 'editsuccess') {
          alert('Note sucessfully edited!');

      
        } else if (data.status === 'error') {
          alert('Error submitting note');

        }
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the note');
      });
  };

  return (
    <div className="notearea">
      <form className="form" onSubmit={handleSubmit}>
        <StyledInputBaseTitle
          type="text"
          value={noteTitle}
          placeholder="Title"
          onChange={handleChangeNoteTitle}
        />
        <textarea
          className="notetextarea"
          value={noteBody}
          placeholder="Type here..."
          onChange={handleChangeNoteBody}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Note;
