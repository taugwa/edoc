import React from 'react'
import "./index.css"
import {Link} from 'react-router-dom'
import LoginSignupButton from './components/LoginSignupButton'

const Signup = () => {
  return (
    <div className="loginBody">
      <h1 className="logintitle">Sign up</h1>
      
      <form className="signupForm">
        <input type="text" placeholder="Email address..." /> <br/>
        <input type="text" placeholder="Username..." /> <br />
        <input type="text" placeholder="Password (min. 8 characters)" /> <br />
        <input type="text" placeholder="Confirm password" /> <br />

        <LoginSignupButton variant="contained" pill="true"
                            sx={{
                              padding: 0.5, mt: 3, ml:0.7
                              
                          }}
          >Sign up</LoginSignupButton>
        
      </form>

      <p className = "loginbottomtext">
        Already have an account? Log in <Link to="/login">here</Link>.</p>
    </div>
  )
}

export default Signup