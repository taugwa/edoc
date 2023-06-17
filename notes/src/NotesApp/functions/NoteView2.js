import React, { useState, useEffect, useContext } from 'react';
import { InputBase } from '@mui/material';
import { AppContext } from '../components/AppContext';
import { styled } from '@mui/system';

const StyledInputBaseTitle = styled(InputBase)(({ theme }) => ({
  fontFamily: theme.typography.heading1.fontFamily,
  fontSize: '50px',
  fontWeight: 'bold',
  width: '800px',
  paddingRight: '10px',
}));

const NoteView2 = ({ note }) => {
  const { content, updateContent } = useContext(AppContext);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');

  useEffect(() => {
    if (note) {
      setNoteTitle(note.Title || '');
      setNoteBody(note.Body || '');
    } else {
      setNoteTitle('');
      setNoteBody('');
    }
  }, [note]);

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

    // Update the note object with the new title and body
    const updatedNote = {
      ...note,
      Title: noteTitle,
      Body: noteBody,
    };

    fetch(`http://localhost:3000/notes/${Username}/${updatedNote.NoteID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedNote),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          alert('Note submitted!');
          // Update the content state with the updated note
          updateContent({ ...content, selectedNote: updatedNote });
        } else if (data.status === 'editsuccess') {
          alert('Note successfully edited!');
          // Update the content state with the updated note
          updateContent({ ...content, selectedNote: updatedNote });
        } else if (data.status === 'error') {
          alert('Error submitting note');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the note');
      });

    // Clear the input fields after submitting
    setNoteTitle('');
    setNoteBody('');
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

export default NoteView2;
