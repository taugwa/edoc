const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "randomnumbersecret";

const mongoUrl = "mongodb+srv://teeyuxun:RP9z92Y968CuByDp@edoccluster.l6nl5ss.mongodb.net/";

mongoose.connect(mongoUrl, {
  useNewUrlParser:true,
}).then(() =>{
  // connection is successful. 
  console.log("connected to database!");})
  // connection failed 
  .catch(error => console.log(error));
;

app.post("/Signup",async(req,res) => {
  const {Email, Username, Password, Password_second} = req.body;
  if (Password !== Password_second) {
    return res.json({ error: "Passwords do not match" });
  }
  const EncryptedPassword = await bcrypt.hash(Password,10);
  try {
    const registeredUser = await User.findOne({Email});
    if (registeredUser) {
     return res.json({error:"User Exists!"});
    }
    await User.create({
      Email,
      Username,
      Password:EncryptedPassword,
      Password_second,
    });
    res.send({status:"ok"});
  } catch (error) {
    res.send({status: "error"});
  }
})
require("./UserDetails");

app.post("/Login", async(req,res) => {
  const {Username, Password} = req.body;
  const user = await User.findOne({Username});
  // look for an existing user in the database. 
  if (!user) {
    //the user does not exist in the database, not registered.
    return res.json({status: "error, not found" , error: "User not found!"});
  }
  if (await bcrypt.compare(Password, user.Password)) {
    // comparing the password with the existing user's password 
    const token = jwt.sign({Username: user.Username}, secret);
    if (res.status(201)) {
      // password matches, return successful. 
      return res.json({status:"successful", data:token});
      // returns the token 
    } else {
      return res.json({error: "unsuccessful, error"});
    }
  }
  res.json({status: "error", error: "Invalid Password"});
});
 
app.post("/Welcome", async(req,res) => {
  const {token} = req.body;
  try {
    const user = jwt.verify(token, secret);
    const user_Email = user.Email;
    User.findOne({Username: user.Username}).then((data) => {
      res.send({status: "ok", data:data});
    }).catch((error) => {
      res.send({status:"error", data:error});
    });
  } catch(error) {};
})

app.post("/resetpassword", async(req,res) => {
  const {Username, New_Password, Confirm_Password} = req.body;
  if (New_Password !== Confirm_Password) {
    return res.json({status: "error pw not matching", error: "Passwords do not match" });
    
  }
  if (New_Password.length < 8) {
    return res.json({status: "error min length", error:'Password must have at least 8 characters'});

  }
  try {
    const user = await User.findOne({Username});
    if (!user) {
      // user not found in database. 
      return res.json({error: "User not found!"});
    }
    user.Password = await bcrypt.hash(New_Password, 10);
    await user.save();
    // update user password.
    res.json({status: "Password reset was successful!"});
  } catch (error) {
    // errors in process
    console.error(error);
    res.status(500).json({error :"Error occured during password reset. Try again"});
  }
});

const User = mongoose.model("UserDetails");
app.listen(3000, () => {
  console.log("server started!");
});

// app.post("/post", async(req,res) => {
//   console.log(req.body);
//   const{data} = req.body;

//   try {
//     if (data == "teeyuxun") {
//       res.send({status:"ok"});
//     } else {
//       res.send({status: "noooo"});
//     }
//   } catch(error) {
//     res.send({status:"something wrong"});
//   }
// });