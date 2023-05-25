import React, {Component} from 'react';
import { InputBase } from "@mui/material";
import { styled } from '@mui/system';


const StyledInputBaseTitle = styled(InputBase)(({ theme }) => ({
  fontFamily: theme.typography.heading1.fontFamily,
  fontSize: "50px",
  fontWeight: "bold",
  width: "800px",
  paddingRight: "10px",
}));

/*
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

*/

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Title: 'New Note',
      Body: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeNoteTitle = (event) => {
    this.setState({ Title: event.target.value });
  }

  handleChangeNoteBody = (event) => {
    this.setState({ Body: event.target.value });
  }


  handleSubmit(e) {
    e.preventDefault();
    const { Title, Body } = this.state;
    console.log(Title, Body);
    const token = localStorage.getItem('token');
    fetch("http://localhost:3000/notes", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body: JSON.stringify({
        Username: this.props.Username,
        Title,
        Body,
      }),
    }).then((res) => res.json())
    .then((data) => {
    //  console.log(data," creating note");
      console.log(data);
      if (data.status === 'success') {
        alert('Note submitted!');
      } else if (data.status === 'error') {
        alert('Error submitting note');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred while submitting the note');
    });
}

  render() {
    const { noteTitle, noteBody } = this.state;
    const { Username } = this.props;

    return (
      <div className="notearea">
        <form className= "form" onSubmit={this.handleSubmit}>
          <StyledInputBaseTitle type="text" value={noteTitle} placeholder="Title" onChange={this.handleChangeNoteTitle} />
          <textarea className="notetextarea" value={noteBody} placeholder="Type here..." onChange={this.handleChangeNoteBody} />
          <button type="submit">
            save
          </button>
        </form>
      </div>
    );
  }
}

export default Note