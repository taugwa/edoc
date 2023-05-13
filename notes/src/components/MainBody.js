import MainButton from './MainButton'
import MainLogoTitle from './LogoTitle'
import Icon1 from "./images/Icon1.png";
import { Typography } from '@mui/material';


const MainBody = () => {

    return (
        <div className="mainBody">
            <div className="bodyLeft">
                <MainLogoTitle className="mainPgLogo"/>
                <Typography>Notetaking for life's enthusiasts.</Typography>
                
                <MainButton variant="contained" pill="true"
                sx={{
                    typography:{
                    fontFamily: 'Arimo, sans-serif'
                }}}>🍄 Join the community</MainButton>
            </div>
            <div className="bodyRight"><img src={ Icon1 } className="icon1"/></div>
            
        </div>

    )
}

export default MainBody