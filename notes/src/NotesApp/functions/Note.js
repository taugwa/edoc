import { InputBase, Typography, TextField } from "@mui/material";
import React, { useState } from 'react';
import { styled } from '@mui/system';


const StyledInputBaseTitle = styled(InputBase)(({ theme }) => ({
    fontFamily: theme.typography.heading1.fontFamily,
    fontSize: "50px",
    fontWeight: "bold",
    width:"800px",
    paddingRight: "10px",


  }));
  
function Note ({userName}) {
    
    const [noteTitle, setNoteTitle] = useState('New Note')
    const handleChangeNoteTitle = (event) => {
        setNoteTitle(event.target.value);
    }


    return (
        <div className="notearea">
          
            <StyledInputBaseTitle type="text" value={noteTitle} placeholder="Title" onChange={handleChangeNoteTitle} />
          
            <textarea className="notetextarea" placeholder="Type here..."/>
        </div>

    )
}

export default Note

const InputBox = () => {
    const [inputValue, setInputValue] = useState('Default Text');
  
    const handleChange = (event) => {
      setInputValue(event.target.value);
    };
  
    return (
      <input type="text" value={inputValue} onChange={handleChange} />
    );
  };
  
