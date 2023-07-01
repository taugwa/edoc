import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom'; 
import SearchSubSidebar from '../components/SearchSubSidebar'
import BookmarksSubSidebar from '../components/BookmarksSubSidebar'
import Sidebar from '../components/Sidebar';
import { Grid } from '@mui/material';
import Toolbar from '../components/Toolbar';
import Editor from '../TextEditor';
import LoginSignupButton from '../../Main/components/LoginSignupButton';
import { InputBase, Button } from '@mui/material';

import { AppContext } from '../components/AppContext';
import { styled } from '@mui/system';

const StyledInputBaseTitle = styled(InputBase)(({ theme }) => ({
  fontFamily: theme.typography.heading1.fontFamily,
  fontSize: '50px',
  fontWeight: 'bold',
  width: '800px',
  paddingRight: '10px',
}));


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
    fetch(`https://edoc-y84w-dfnz3qbt5-yuxunn.vercel.app/notes/${Username}/${NoteId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': 'https://edoc-y84w.vercel.app/',
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


  useEffect(() => {
    const autosaveTimeout = setTimeout(saveNote, 200); // Set a delay of 2000 milliseconds (2 seconds) for autosave
    return () => {
      clearTimeout(autosaveTimeout);
    };
  }, [noteTitle, noteBody]); // Run the autosave effect whenever the noteTitle or noteBody changes

  const saveNote = (e) => {
    //e.preventDefault();
    const token = localStorage.getItem('token');
    fetch(`https://data.mongodb-api.com/app/data-gjgfv/endpoint/data/v1/notes/${Username}/${NoteId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': 'https://edoc-y84w.vercel.app/',
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
            console.log("hi" + noteTitle);
            console.log("hi" + noteBody);

        } else if (data.status === 'editsuccess') {
          //alert('Note successfully edited!');
        } else if (data.status === 'error') {
          alert('Error submitting note');
        }
        //window.location.reload();
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the note');
      });
  };

  const handleChangeNoteTitle = (event) => {
    setNoteTitle(event.target.value);
  };

  const handleChangeNoteBody = (content) => {
    setNoteBody(content);
  };

  return (
    <div className="notearea">
       <Toolbar selectedNote={selectedNote} updateContent={updateContent} />
       <form className="noteForm" onSubmit={saveNote}>
        <StyledInputBaseTitle
          type="text"
          value={noteTitle}
          placeholder="Title"
          onChange={handleChangeNoteTitle}
        />
      <Editor value={noteBody} onChange={handleChangeNoteBody} />
     
      </form>
    </div>
  );
};

export default Page;
