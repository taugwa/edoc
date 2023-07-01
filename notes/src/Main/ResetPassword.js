import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import LoginSignupButton from './components/LoginSignupButton'

class ResetPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Username: "",
      New_Password: "",
      Confirm_Password:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    const {Username, New_Password, Confirm_Password}  = this.state;
    console.log(Username, New_Password, Confirm_Password);
    fetch("https://data.mongodb-api.com/app/data-gjgfv/endpoint/data/v1/resetpassword", {
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"https://edoc-y84w.vercel.app/",
      },
      body: JSON.stringify({
        Username,
        New_Password,
        Confirm_Password,
      }),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data, "Updated_User");
      if (data.status === "Password reset was successful!") {
        alert("Password successfully updated!");
      }
      if (data.status === "error pw not matching") {
        alert("Password do not match");
      }
      if (data.status === "error min length") {
        alert("Password must be minimum 8 characters");
      }
    })
  }
  render(){
 
  return (
    <div className="loginBody">
      <h1 className="logintitle">Reset password</h1>
      
      <form onSubmit = {this.handleSubmit} className="resetpwForm">
        <input type="text" 
        placeholder="Username..."
        onChange = {e => this.setState({Username: e.target.value})}
         /> <br />
        <input type="password" 
        placeholder="New password (min. 8 characters)"
        onChange = {e => this.setState({New_Password: e.target.value})}
         /> <br />
        <input type="password"
         placeholder="Confirm new password"
         onChange = {e => this.setState({Confirm_Password: e.target.value})} 
         /> <br />

        <LoginSignupButton type = "submit" variant="contained" pill="true"
                            sx={{
                              padding: 0.5, mt: 3, ml:0.7
                              
                          }}
          >Reset password</LoginSignupButton>
        
      </form>

      <p className = "loginbottomtext">
        Already have an account? Log in <Link to="/login">here</Link>.</p>
    </div>
  )
}
}

export default ResetPassword