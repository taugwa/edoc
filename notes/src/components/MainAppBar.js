import { Typography } from '@mui/material';
import {
    BrowserRouter as Router,
    Routes, Route, Link
  } from 'react-router-dom'

const MainAppBar = () => {
    const padding = {
        padding: 5
    }

    return (
    <Router>
        <Link style={padding} to="/">
            <Typography style={{ display: 'inline' }}>Log in</Typography>
        </Link>
        <Link style={padding} to="/notes">
            <Typography style={{ display: 'inline' }}>Sign up</Typography>
        </Link>
    </Router>

    )
}

export default MainAppBar