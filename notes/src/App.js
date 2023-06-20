
import MainAppBar from './Main/components/MainAppBar'
import './index.css';
import MainBody from './Main/components/MainBody'
import Login from "./Main/Login"
import Signup from "./Main/Signup"
import Page from "./NotesApp/functions/page"
import Welcome from './NotesApp/Welcome'
import UserLandingPage from './NotesApp/UserLandingPage'

import Sidebar from './NotesApp/components/Sidebar'
import HiUser from './NotesApp/functions/HiUser'
import { createTheme, ThemeProvider} from '@mui/material'
import { Route, Routes } from 'react-router-dom';
import ResetPassword from './Main/ResetPassword';


const theme = createTheme({
    palette: {
      
    },

    typography: {

        fontFamily: 'Didact Gothic, sans-serif',
        heading1: {
          fontFamily:'EB Garamond, serif',
        }
    }
});
  

function App () {
  
  return (
      <div>
        <ThemeProvider theme={theme}>
          
          <Routes>
            <Route component={Sidebar} />
            <Route path="/" element={<div className="mainbg"><MainAppBar /><MainBody /></div>} />
            <Route path="/login" element={<div className=""><MainAppBar /><Login /></div>} />
            <Route path="/signup" element={<div className=""><MainAppBar /><Signup /></div>}/>
            <Route path="/resetpassword" element={<div className=""><MainAppBar /><ResetPassword /></div>}/>
            <Route path = "/Welcome" element = {<div className="notesapp"><Welcome PageType="HiUser"/></div>}/>
            <Route path="/notes/:Username/:NoteId" element={<div className="notesapp"><Welcome PageType="Page"/></div>} />

          </Routes>


 
        </ThemeProvider>
      </div>
  )
}

export default App