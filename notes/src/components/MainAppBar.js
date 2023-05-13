
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
        <Link style={padding} to="/">Log in</Link>
        <Link style={padding} to="/notes">Sign up</Link>
    </Router>

    )
}

export default MainAppBar