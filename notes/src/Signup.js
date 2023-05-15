import React from 'react'
import "./index.css"
import {Link} from 'react-router-dom'

const Signup = () => {
  return (
    <div className="loginBody">
      <h1 className="logintitle">Sign up</h1>
      
      <form className="signupForm">
        <input type="text" placeholder="Email address..." /> <br/>
        <input type="text" placeholder="Username..." /> <br />
        <input type="text" placeholder="Password (min. 8 characters)" /> <br />
        <input type="text" placeholder="Confirm password" /> <br />
      </form>

      <p className = "loginbottomtext">
        Already have an account? Log in <Link to="/login">here</Link>.</p>
    </div>
  )
}

export default Signup