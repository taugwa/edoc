import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NoteView2 from './functions/NoteView2';

const Page = () => {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/notes/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
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
  }, [id]);
  
  return (
    <div className="page-container">
      <NoteView2 note={note} />
    </div>
  );
};

export default Page;
