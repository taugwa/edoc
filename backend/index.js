const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");

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