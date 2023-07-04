import React , {Component} from 'react';

import {Link} from 'react-router-dom'
import LoginSignupButton from './components/LoginSignupButton'

class Login extends Component {
  constructor(props) {
    super(props);
      this.state = {
        Username: "",
        Password: "",
      };
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
      e.preventDefault();
      const {Username, Password} = this.state;
      console.log(Username, Password);
      fetch("http://localhost:3001/Login",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
      
        Username,
        Password,
       
      }),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data,"User_Login");
      if (data.status === "successful") {
        //alert("User successfully logged in! Welcome!");
        window.localStorage.setItem("token", data.data);
        window.location.href = "./Welcome"
    }
    if (data.status === "error, not found") {
      alert("User not found");
    }
    if (data.status === "error") {
      alert("Incorrect password/username");
    }
    })
  }
    render() {
  return (
    <div className="loginBody">
      <h1 className="logintitle">Log in</h1>
      
      <form className="loginForm" onSubmit = {this.handleSubmit}>
        <input 
        type="text" 
        placeholder="Username..."
        onChange={(e) => this.setState({Username: e.target.value})} 
        /> 
        <br/>
        <input 
        type="password" 
        placeholder="Password..."
        onChange={(e) => this.setState({Password: e.target.value})}
         />
    
          <LoginSignupButton type = "submit" variant="contained" pill="true"
                            sx={{
                              padding: 0.5, mt: 3, ml:0.7
                              
                          }}
          >Log in</LoginSignupButton>
        
        
      </form>

      <p className = "loginbottomtext">
        Don't have an account? Sign up <Link to="/signup">here</Link>.<br/>
        Forgot your username or password? Click <Link to="/resetpassword">here</Link>.</p>
    </div>
  )
}
}
export default Login

/*
const Login = () => {
    return (
        <div className="cover" >
           <div className = "logintitle">
            <h1>Login</h1>
           <form action = "loginform">
         <div className = "inputtext">
         <input type = "text" placeholder="Username"/>
    </div>
    <div className = "inputtext">
     <input type = "password" placeholder = "Password"/>
   </div>
     <button className = "login-button" id = "login-button"> Login </button>
  <p className = "text"> Don't have an account? Sign up <a href ="#"> here</a>.</p>
  <p className = "textsecondline">Forgot your username or password? Click <a href = "#2"> here</a>.</p>
         </form>
         </div>
         </div>
         
    )
}
export default Login

*/