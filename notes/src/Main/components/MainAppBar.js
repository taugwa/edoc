import { Typography } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'

const MainAppBar = () => {
    const barStyle = {
        padding: 8,
        textDecoration: 'none', 
        color: '#292F33',
    }

    return (
        <div className="mainAppBar">
                <nav>
                    <Link style={barStyle} to="/">
                        <Typography sx={{ fontSize: 18,display:'inline' }}>Home</Typography>
                    </Link>
                    <Link style={barStyle} to="/login">
                        <Typography sx={{ 
                                fontSize: 18, 
                                display:'inline'
                            }}>Log in</Typography>
                    </Link>
                    <Link style={barStyle} to="/signup">
                        <Typography sx={{ fontSize: 18,display:'inline' }}>Sign up</Typography>
                    </Link>
                </nav>
        </div>


    )
}

export default MainAppBar