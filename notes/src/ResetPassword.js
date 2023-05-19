import React from 'react'
import "./index.css"
import {Link} from 'react-router-dom'
import LoginSignupButton from './components/LoginSignupButton'

const ResetPassword = () => {
  return (
    <div className="loginBody">
      <h1 className="logintitle">Reset password</h1>
      
      <form className="resetpwForm">
        <input type="text" placeholder="Username..." /> <br />
        <input type="text" placeholder="New password (min. 8 characters)" /> <br />
        <input type="text" placeholder="Confirm new password" /> <br />

        <LoginSignupButton variant="contained" pill="true"
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

export default ResetPassword