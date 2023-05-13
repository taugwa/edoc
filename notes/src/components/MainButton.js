import { styled } from "@mui/material/styles";
import Button from '@mui/material/Button';

const MainButton = styled(Button)(({ pill }) => ({
    borderRadius: pill ? 50 : 4,
    textTransform: 'none',
    backgroundColor: '#8269F8',

  }));

  export default MainButton