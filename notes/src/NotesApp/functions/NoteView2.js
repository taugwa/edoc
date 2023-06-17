import React, { useContext, useEffect, useState } from 'react';
import { InputBase } from '@mui/material';
import { AppContext } from '../components/AppContext';
import { styled } from '@mui/system';
import { useParams } from 'react-router-dom';

const StyledInputBaseTitle = styled(InputBase)(({ theme }) => ({
    fontFamily: theme.typography.heading1.fontFamily,
    fontSize: '50px',
    fontWeight: 'bold',
    width: '800px',
    paddingRight: '10px',
  }));
const NoteView2 = () => {
    const { content, updateContent } = useContext(AppContext);
    const [noteID, setNoteID] = useState('');
    const [noteTitle, setNoteTitle] = useState('');
    const [noteBody, setNoteBody] = useState('');
    useEffect(() => {
        if (content.selectedNote) {
          setNoteTitle(content.selectedNote.Title || '');
          setNoteBody(content.selectedNote.Body || '');
          setNoteID(content.selectedNote.NoteID || '' )
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
            NoteID: noteID,
            Title: noteTitle,
            Body: noteBody,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 'success') {
              alert('Note submitted!');
              // Update the content state with the new note title
              updateContent({ ...content, selectedNote: { ...content.selectedNote, Title: noteTitle } });
            } else if (data.status === 'editsuccess') {
              alert('Note successfully edited!');
              // Update the content state with the new note title
              updateContent({ ...content, selectedNote: { ...content.selectedNote, Title: noteTitle } });
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

export default NoteView2;

