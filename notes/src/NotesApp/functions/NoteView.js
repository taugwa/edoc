import React from 'react';
import { InputBase } from "@mui/material";
import { styled } from '@mui/system';

const StyledInputBaseTitle = styled(InputBase)(({ theme }) => ({
  fontFamily: theme.typography.heading1.fontFamily,
  fontSize: "50px",
  fontWeight: "bold",
  width: "800px",
  paddingRight: "10px",
}));

function Note({ Title, handleChangeNoteTitle }) {
  return (
    <div className="notearea">
      <StyledInputBaseTitle
        type="text"
        value={Title}
        placeholder="Title"
        onChange={handleChangeNoteTitle}
      />
      <textarea className="notetextarea" placeholder="Type here..." />
    </div>
  );
}

export default Note;

