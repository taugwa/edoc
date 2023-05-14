import React from 'react'
import "./Login.css"
import background from "../assests/edocloginbackground.png"

const Login = () => {
    return (
        <div className="cover" style={{ backgroundImage: `url(${background})` }}>
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









      