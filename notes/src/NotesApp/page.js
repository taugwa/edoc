
import { useParams } from 'react-router-dom';
import React, { Component, useContext, useEffect, useState } from 'react';
import SearchSubSidebar from './components/SearchSubSidebar'
import BookmarksSubSidebar from './components/BookmarksSubSidebar'
import Sidebar from './components/Sidebar';
import SubSidebar from './components/SubSidebar';
import { Grid } from '@mui/material';
import Note from './functions/NoteView';
import LoginSignupButton from '../Main/components/LoginSignupButton';
import { InputBase, Button } from '@mui/material';

import { AppContext } from './components/AppContext';

import { styled } from '@mui/system';

const StyledInputBaseTitle = styled(InputBase)(({ theme }) => ({
  fontFamily: theme.typography.heading1.fontFamily,
  fontSize: '50px',
  fontWeight: 'bold',
  width: '800px',
  paddingRight: '10px',
}));

const Page = (props) => {
  const { Username, NoteId } = useParams();
  const [noteTitle, setNoteTitle] = useState('');
  const [noteBody, setNoteBody] = useState('');
  const { content, updateContent } = useContext(AppContext);

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
    <div className="notearea">
      <form className="form" onSubmit={saveNote}>
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
        <Button type="submit">Save</Button>
      </form>
    </div>
  );
  
/*
  return (
      <div>
            <Grid container  sx={{ minHeight: '100vh' }} wrap="nowrap">
                <Grid item>
                    <Sidebar Username={Username}/>
                </Grid>
                
                { content.searchSubSidebar && (<Grid item><SearchSubSidebar/></Grid>)  }
                { content.bookmarksSubSidebar && (<Grid item xs={2}><BookmarksSubSidebar/></Grid>)  }
              
                <Grid item xs={12}>
                <div className="page-container">
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


         
              </Grid>
              
          </Grid>
          
      </div>
  )
  */
};

export default Page;
