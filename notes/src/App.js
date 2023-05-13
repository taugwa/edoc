
import MainAppBar from './components/MainAppBar'
import './index.css';
import MainBody from './components/MainBody'


import { createTheme, ThemeProvider, Typography } from '@mui/material'


const theme = createTheme({
    palette: {
      
    },

    typography: {
        fontFamily: 'Didact Gothic, sans-serif'
    }
});
  

function App () {
  return (
    <div className="pagemargin">
      <div className="mainbg">
        <ThemeProvider theme={theme}>
          <MainAppBar  />
          <MainBody />
 
        </ThemeProvider>
      </div>
    </div>
  )
}





export default App