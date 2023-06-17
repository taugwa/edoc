import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteView2 from '../NotesApp/functions/NoteView2';

const Page = () => {
  const { username, noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetchNote();
  }, [username, noteId]);

  const fetchNote = () => {
    fetch(`http://localhost:3000/notes/${username}/${noteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { status, note } = data;
        if (status === 'success') {
          setNote(note);
        } else {
          console.error('Error:', status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const saveNote = () => {
    const newNote = {
      Title: 'Updated Note Title',
      Body: 'Updated Note Body',
    };

    fetch(`http://localhost:3000/notes/${username}/${noteId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((data) => {
        const { status, message } = data;
        if (status === 'success') {
          console.log(message);
          fetchNote();
        } else {
          console.error('Error:', message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="page-container">
      <NoteView2 note={note} />
    </div>
  );
};

export default Page;

