import MainButton from './MainButton'
import MainLogoTitle from './LogoTitle'
import Icon1 from "./images/Icon1.png";
import { Typography } from '@mui/material';

import { Grid } from '@mui/material';

const MainBody = () => {


    return (
        <div className="mainBody">
        <Grid container spacing={3}
        wrap="nowrap" // --> add this line to disable wrap
         sx={{ overflow: "auto" }}>
            
            <Grid item xs={12} sm={6} md={5.5}>
                <div className="leftBody">
                    <MainLogoTitle className="mainPgLogo"/>
                    <div className="subtitle">
                        <Typography sx={{pl: 0.5, pd:0.5, ml: 2, md:2,fontSize: 30}}>
                            Notetaking for life's enthusiasts.
                        </Typography>
                    </div><br/>

                    <div className="mainButton">
                        <MainButton variant="contained" pill="true"
                            sx={{
                            typography:{
                                fontFamily: 'Arimo, sans-serif'
                            },
                            width: 300,
                            padding: 1, ml: 2, mt: 4,
                            fontSize: '20px'
                        }}>🍄 Join the community</MainButton>
                    </div>
                </div>
                
             </Grid>
             
             <Grid item xs={12} sm={6} md={6}>
                <div className='icon1-container'><img src={ Icon1 } className="icon1"/></div>
                
            </Grid>
            
         </Grid>
         </div>
    )
}

/*
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
*/

export default MainBody