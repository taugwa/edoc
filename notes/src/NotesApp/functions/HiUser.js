import { Typography } from "@mui/material";
function HiUser ({Username}) {
    return (
        <div className="notearea">
            <Typography variant="heading1">Hi {Username}!</Typography>
            <div className="notearea-recents">
                <Typography sx={{fontSize: "20px"}}>Recents</Typography>
            </div>
            
        </div>

    )
}

export default HiUser