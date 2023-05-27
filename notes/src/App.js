
import MainAppBar from './Main/components/MainAppBar'
import './index.css';
import MainBody from './Main/components/MainBody'
import Login from "./Main/Login"
import Signup from "./Main/Signup"

import Welcome from './NotesApp/Welcome'

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
      <div className>
        <ThemeProvider theme={theme}>
          
          <Routes>
            <Route path="/" element={<div className="mainbg"><MainAppBar /><MainBody /></div>} />
            <Route path="/login" element={<div className=""><MainAppBar /><Login /></div>} />
            <Route path="/signup" element={<div className=""><MainAppBar /><Signup /></div>}/>
            <Route path="/resetpassword" element={<div className=""><MainAppBar /><ResetPassword /></div>}/>
            <Route path = "/Welcome" element = {<div className="notesapp"><Welcome /></div>}/>
          </Routes>


 
        </ThemeProvider>
      </div>
  )
}

export default App