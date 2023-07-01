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
    fetch("https://data.mongodb-api.com/app/data-gjgfv/endpoint/data/v1/Welcome",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"https://edoc-y84w.vercel.app/",
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
      <body>
        <AppProvider>
        <UserLandingPage
            Username={this.state.Welcome.Username}
            PageType={this.props.PageType} 
          />
         
        </AppProvider>
      </body>
    );
  }
}

export default Welcome;
