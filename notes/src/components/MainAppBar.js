import { Typography } from '@mui/material';
import { alignProperty } from '@mui/material/styles/cssUtils';
import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'

const MainAppBar = () => {
    const barStyle = {
        padding: 5
    }

    return (
    <Router>
        <Link style={barStyle} to="/">
            <Typography style={{ display: 'inline' }}>Log in</Typography>
        </Link>
        <Link style={barStyle} to="/notes">
            <Typography style={{ display: 'inline' }}>Sign up</Typography>
        </Link>
    </Router>

    )
}

export default MainAppBar