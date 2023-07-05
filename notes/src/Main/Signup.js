import React , {Component} from 'react';
import {Link} from 'react-router-dom';
import LoginSignupButton from './components/LoginSignupButton'
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Username: "",
      Password: "",
      Password_second:"",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { Email, Username, Password, Password_second } = this.state;
    if (Password !== Password_second) {
      alert('Passwords do not match'); // Display the alert
      return;
    }
    if (Password.length < 8) {
      alert('Password must have at least 8 characters');
      return;
    }
    console.log(Email, Username, Password, Password_second);
    fetch("http://localhost:3001/signup",{
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        Email,
        Username,
        Password,
        Password_second
      }),
    }).then((res) => res.json())
    .then((data) => {
      console.log(data,"UserDetails");
      if (data.status === "ok") {
        alert("Sign-up successful!");
      }
    })
  }

  render() {
  return (
    <div className="loginBody">
      <h1 className="logintitle">Sign up</h1>
      
      <form onSubmit = {this.handleSubmit} className="signupForm">
        <input type="text" 
        placeholder="Email address..." 
        onChange = {e => this.setState({Email:e.target.value})}
        /> <br/>
        <input type="text" 
        placeholder="Username..." 
        onChange = {e => this.setState({Username:e.target.value})}
        /> <br />
        <input type="password" 
        placeholder="Password (min. 8 characters)" 
        onChange = {e => this.setState({Password:e.target.value})}
        /> <br />
        <input type="password"
         placeholder="Confirm password"
         onChange = {e => this.setState({Password_second :e.target.value})}
         /> <br />
         <LoginSignupButton type = "submit" variant="contained" pill="true"
                            sx={{
                              padding: 0.5, mt: 3, ml:0.7
                          }}
          >Sign up</LoginSignupButton>
      </form>

      <p className = "loginbottomtext">
        Already have an account? Log in <Link to="/login">here</Link>.</p>
    </div>
  );
  }
}

export default Signup


