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
              { content.bookmarksSubSidebar && (<Grid item xs={2}><BookmarksSubSidebar/></Grid>)  }
             
              <Grid item xs={12}>
                  <Content Username={Username}/>
         
              </Grid>
              
          </Grid>
          
      </div>

  )
}

export default UserLandingPage