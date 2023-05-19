
import MainAppBar from './components/MainAppBar'
import './index.css';
import MainBody from './components/MainBody'
import Login from "./Login"
import Signup from "./Signup"
import Welcome from './Welcome'

import { createTheme, ThemeProvider} from '@mui/material'
import { Route, Routes } from 'react-router-dom';
import ResetPassword from './ResetPassword';


const theme = createTheme({
    palette: {
      
    },

    typography: {
        fontFamily: 'Didact Gothic, sans-serif'
    }
});
  

function App () {
  
  return (
      <div className="mainbg">
        <ThemeProvider theme={theme}>
          <MainAppBar />
          <Routes>
            <Route path="/" element={<MainBody />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />}/>
            <Route path="/resetpassword" element={<ResetPassword />}/>
            <Route path = "/Welcome" element = {<Welcome />}/>
          </Routes>


 
        </ThemeProvider>
      </div>
  )
}

export default App