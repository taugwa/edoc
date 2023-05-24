import { Typography } from "@mui/material";
function HiUser ({userName}) {
    return (
        <div className="notearea">
            <Typography variant="heading1">Hi {userName}!</Typography>
            <div className="notearea-recents">
                <Typography sx={{fontSize: "20px"}}>Recents</Typography>
            </div>
            
        </div>

    )
}

export default HiUser