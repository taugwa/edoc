import React, { Component, useContext, useEffect } from 'react';
import SearchSubSidebar from './components/SearchSubSidebar'
import BookmarksSubSidebar from './components/BookmarksSubSidebar'
import Sidebar from './components/Sidebar';

import { Grid } from '@mui/material';

import LoginSignupButton from '../Main/components/LoginSignupButton';
import { InputBase } from "@mui/material";


import Content from './components/Content'
import { AppContext } from './components/AppContext';

import { Typography } from "@mui/material";
import HiUser from './functions/HiUser';
import Page from './functions/page';

function UserLandingPage({Username, PageType}) {

  const { content, updateContent } = useContext(AppContext);
  useEffect(() => {
      updateContent({...content, PageType: PageType, Username: Username });
    }, [Username]);
    
    let renderedComponent;
    console.log(PageType)
    if (PageType === 'HiUser') {
        renderedComponent = <HiUser Username={Username} />;
    } else if (PageType === 'Page') {
        renderedComponent = <Page Username={Username} />
       
    }

  return (

    <div className='userlandingpage'>
        <Grid container  sx={{ minHeight: '100vh' }} wrap="nowrap">
            <Grid item>
                <Sidebar Username={Username}/>
            </Grid>
            
            { content.searchSubSidebar && (<Grid item><SearchSubSidebar Username={Username}/></Grid>)  }
            { content.bookmarksSubSidebar && (<Grid item><BookmarksSubSidebar/></Grid>)  }
           
            <Grid item>
                
            {renderedComponent}
            </Grid>
            
        </Grid>
        
    </div>

)
}

export default UserLandingPage


