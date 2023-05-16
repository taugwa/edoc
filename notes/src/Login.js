import React from 'react'
import "./index.css"
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className="loginBody">
      <h1 className="logintitle">Log in</h1>
      
      <form className="loginForm">
        <input type="text" placeholder="Username..." /> <br/>
        <input type="text" placeholder="Password..." />
      </form>

      <p className = "loginbottomtext">
        Don't have an account? Sign up <Link to="/signup">here</Link>.<br/>
        Forgot your username or password? Click <Link to="">here</Link>.</p>
    </div>
  )
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