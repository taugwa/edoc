import React, { Component, useContext, useEffect } from 'react';
import SearchSubSidebar from './components/SearchSubSidebar'
import BookmarksSubSidebar from './components/BookmarksSubSidebar'
import Sidebar from './components/Sidebar';
import SubSidebar from './components/SubSidebar';
import { Grid } from '@mui/material';
import Note from './functions/NoteView';
import LoginSignupButton from '../Main/components/LoginSignupButton';
import { InputBase } from "@mui/material";

import Content from './components/Content'
import { AppProvider,AppContext } from './components/AppContext';



function UserLandingPage({Username}) {

  const { content, updateContent } = useContext(AppContext);
  useEffect(() => {
      updateContent({ Username: Username });
    }, [Username]);

  

  return (

      <div>
          <Grid container  sx={{ minHeight: '100vh' }} wrap="nowrap">
              <Grid item>
                  <Sidebar Username={Username}/>
              </Grid>
              
              { content.searchSubSidebar && (<Grid item><SearchSubSidebar/></Grid>)  }
              { content.bookmarksSubSidebar && (<Grid item><BookmarksSubSidebar/></Grid>)  }
             
              <Grid item xs={12}>
                  <Content Username={Username}/>
              </Grid>
              
          </Grid>
          
      </div>

  )
}

export default UserLandingPage

/*
class UserLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: "",
      Body: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleChangeNoteTitle = (event) => {
    this.setState({
      Title: event.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { Title, Body } = this.state;
    console.log(Title, Body);
    const token = localStorage.getItem('token');
    fetch("http://localhost:3000/notes", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        Username: this.props.Username,
        Title,
        Body,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
      //  console.log(data," creating note");
        console.log(data);
        if (data.status === 'success') {
          alert('Note submitted!');
        } else if (data.status === 'error') {
          alert('Error submitting note');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while submitting the note');
      });
  }

  render() {
    const { Username } = this.props;
    const { Title, Body } = this.state;

    return (
      <div>
        <form className= "form" onSubmit={this.handleSubmit}>
          <Grid container sx={{ minHeight: '100vh' }} wrap="nowrap">
            <Grid item>
              <Sidebar Username={Username} />
            </Grid>
            <Grid item>
              <SubSidebar />
            </Grid>
            <Grid item xs={12}>
              <Note Title={Title} 
              handleChangeNoteTitle={this.handleChangeNoteTitle} />
            </Grid>
          </Grid>
          <LoginSignupButton
            type="submit"
            variant="contained"
            pill="true"
            sx={{
              padding: 0.5,
              mt: 3,
              ml: 0.7,
            }}
          >
            Submit
          </LoginSignupButton>
        </form>
      </div>
    );
  }
}

export default UserLandingPage;
*/