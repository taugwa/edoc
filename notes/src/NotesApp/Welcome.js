import React, { Component } from "react";
import UserLandingPage from "./UserLandingPage";
import HiUser from "./functions/HiUser"
import { AppProvider } from "./components/AppContext";

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
      <div>
        <AppProvider>
        <UserLandingPage
            Username={this.state.Welcome.Username}
            PageType={this.props.PageType} 
          />
         
        </AppProvider>
      </div>
    );
  }
}

export default Welcome;
