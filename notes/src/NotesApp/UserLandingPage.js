
import Sidebar from './components/Sidebar'
import SubSidebar from './components/SubSidebar'
import HiUser from './components/HiUser'


import { Grid } from '@mui/material';

const UserLandingPage = (props) => {

    return (
        <div>
            <Grid container  sx={{ minHeight: '100vh' }}>
                <Grid item>
                    <Sidebar userName={props.userName}/>
                </Grid>
                <Grid item>
                    <SubSidebar/>
                </Grid>
                <Grid item>
                    <HiUser userName={props.userName}/>
                </Grid>
                
            </Grid>
            
        </div>
    )
}

export default UserLandingPage