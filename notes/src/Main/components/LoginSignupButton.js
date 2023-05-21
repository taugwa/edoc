import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';

const LoginSignupButton = styled(Button)(({ pill }) => ({
    borderRadius: 10,
    textTransform: 'none',
    backgroundColor: '#595C60',
    typography:{
        fontFamily: 'Didact Gothic, sans-serif'
    },
    width: '420px',
    
    fontSize: '20px'
  }));

export default LoginSignupButton