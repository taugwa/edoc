
import Sidebar from './components/Sidebar'
import SubSidebar from './components/SubSidebar'
import HiUser from './functions/HiUser'
import Note from './functions/Note'

import Content from './components/Content'
import { AppProvider,AppContext } from './components/AppContext';
import { Grid } from '@mui/material';
import React, { useContext, useEffect } from 'react';


function UserLandingPage({userName}) {

    const { content, updateContent } = useContext(AppContext);
    useEffect(() => {
        updateContent({ userName: userName });
      }, []);

    

    return (

        <div>
            <Grid container  sx={{ minHeight: '100vh' }}>
                <Grid item>
                    <Sidebar userName={userName}/>
                </Grid>
                <Grid item>
                    <SubSidebar/>
                </Grid>
                <Grid item>
                    <Content userName={userName}/>
                </Grid>
                
            </Grid>
            
        </div>

    )
}

export default UserLandingPage