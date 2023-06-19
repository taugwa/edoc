import React, { Component, useContext, useEffect } from 'react';
import SearchSubSidebar from './components/SearchSubSidebar'
import BookmarksSubSidebar from './components/BookmarksSubSidebar'
import Sidebar from './components/Sidebar';
import SubSidebar from './components/SubSidebar';
import { Grid } from '@mui/material';
import HiUser from './HiUser';
import LoginSignupButton from '../Main/components/LoginSignupButton';
import { InputBase } from "@mui/material";

import Content from './components/Content'
import { AppProvider,AppContext } from './components/AppContext';


class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
     Welcome: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/Welcome",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
      token: window.localStorage.getItem("token"),  
      }),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data,"Welcome");
      this.setState({Welcome: data.data});
    });
  }

  render() {
    return (
      
        <AppProvider>

                  <HiUser Username={this.state.Welcome.Username}/>
         
        </AppProvider>


      
    );
  }
}

export default Welcome;
