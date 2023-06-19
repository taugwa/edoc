import { Typography } from "@mui/material";
import React, { Component, useContext, useEffect } from 'react';
import SearchSubSidebar from './components/SearchSubSidebar'
import BookmarksSubSidebar from './components/BookmarksSubSidebar'
import Sidebar from './components/Sidebar';
import SubSidebar from './components/SubSidebar';
import { Grid } from '@mui/material';
import LoginSignupButton from '../Main/components/LoginSignupButton';
import { InputBase } from "@mui/material";

import { AppProvider,AppContext } from './components/AppContext';

function HiUser ({Username}) {
    const { content, updateContent } = useContext(AppContext);
    useEffect(() => {
        updateContent({ Username: Username });
      }, [Username]);

      console.log(content.Username + "hey")

    return (

      <div>
      <Grid container  sx={{ minHeight: '100vh' }} wrap="nowrap">
          <Grid item>
              <Sidebar Username={Username}/>
          </Grid>
          
          { content.searchSubSidebar && (<Grid item><SearchSubSidebar/></Grid>)  }
          { content.bookmarksSubSidebar && (<Grid item xs={2}><BookmarksSubSidebar/></Grid>)  }
         
          <Grid item xs={12}>
            <div className="notearea">
                <Typography variant="heading1">Hi {Username}!</Typography>
                <div className="notearea-recents">
                    <Typography sx={{fontSize: "20px"}}>Recents</Typography>
                </div>
                
        </div>
     
          </Grid>
          
      </Grid>
      
  </div>
      

    )
}



export default HiUser