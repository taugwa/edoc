import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { InputBase, Button } from '@mui/material';
import Toolbar from './components/Toolbar';
import { AppContext } from '../NotesApp/components/AppContext';

const Page = () => {
  const { content, updateContent } = useContext(AppContext);
  const { selectedNote } = content;
  const { Username, NoteId } = useParams();

  const [noteTitle, setNoteTitle] = useState(selectedNote?.Title || '');
  const [noteBody, setNoteBody] = useState(selectedNote?.Body || '');

  useEffect(() => {
    fetchNote();
  }, [Username, NoteId]);

  useEffect(() => {
    if (selectedNote.NoteId === NoteId) {
      setNoteTitle(selectedNote.Title || '');
      setNoteBody(selectedNote.Body || '');
    }
  }, [selectedNote, NoteId]);

  const fetchNote = () => {
    fetch(`http://localhost:3000/notes/${Username}/${NoteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { status, note } = data;
        if (status === 'success') {
          updateContent({
            selectedNote: {
              NoteId: NoteId,
              Title: note.Title || '',
              Body: note.Body || '',
            },
          });
          setNoteTitle(note.Title || '');
          setNoteBody(note.Body || '');
        } else {
          console.error('Error:', status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const saveNote = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch(`http://localhost:3000/notes/${Username}/${NoteId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Username: Username,
        _id: NoteId,
        Title: noteTitle,
        Body: noteBody,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          alert('Note submitted!');
        } else if (data.status === 'editsuccess') {
          alert('Note successfully edited!');
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

  const handleChangeNoteTitle = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleChangeNoteBody = (event) => {
    setNoteBody(event.target.value);
  };

  return (
    <div className="page-container">
      <Toolbar selectedNote={selectedNote} updateContent={updateContent} />
      <form className="form" onSubmit={saveNote}>
        <InputBase
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
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
};

export default Page;
