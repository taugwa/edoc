import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { InputBase, Button } from '@mui/material';

const Page = () => {
  const { Username, NoteId } = useParams();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  

  useEffect(() => {
    fetchNote();
    console.log(NoteId);
  }, [Username, NoteId]);


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
        console.log("hi" + NoteId);
        if (data.status === 'success') {
            console.log("hi" + noteTitle);
            console.log("hi" + noteBody);
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
    <div>
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
