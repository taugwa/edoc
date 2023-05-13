
import MainAppBar from './components/MainAppBar'
import MainLogoTitle from './components/LogoTitle'
import MainButton from './components/MainButton'
import './index.css';

import { createTheme, ThemeProvider } from '@mui/material'

const theme = createTheme({
    palette: {
      
    },

    typography: {
        fontFamily: 'Didact Gothic, sans-serif',
        h2: 'EB Garamond, serif'
    }
});


  

function App () {
  return (
    <ThemeProvider theme={theme}>
      <MainAppBar />
      <MainLogoTitle className="mainPgLogo"/>
      <MainButton variant="contained" pill 
        sx={{
          typography:{
            fontFamily: 'Arimo, sans-serif'
        }}}>🍄 Join the community</MainButton>

    </ThemeProvider>
    
  )
}





export default App