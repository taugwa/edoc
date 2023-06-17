const express = require('express');
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = "randomnumbersecret";
require("./UserDetails");
require("./Note");
const { ObjectId } = require('mongodb');
const UserDetails = require("./UserDetails");
const Note = mongoose.model("Note");
const User = mongoose.model("UserDetails");
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


app.post("/notes", async (req, res) => {
  const { Username, Title, Body } = req.body;
  const user = await User.findOne({ Username });

  try {
    if (!user) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const note = new Note({
      Title,
      Body,
    });

    await note.save();

    user.notes.push(note._id);
    await user.save();

    const noteUrl = `/notes/${note._id}`; // Generate the URL for the new note
    return res.status(201).json({ status: "success", message: "Note created successfully", noteUrl });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: "error", message: "Error creating note" });
  }
});



app.get('/notes/:Username', async (req, res) => {
  try {
    const { Username } = req.params;
   //console.log(Username);
    const user = await UserDetails.findOne({ Username });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }
    const notes = await Note.find({ _id: { $in: user.notes } });
    return res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: 'Error retrieving notes' });
  }
});


app.get('/notes/:id', async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await Note.findById(noteId);
    if (!note) {
      return res.status(404).json({ status: 'error', message: 'Note not found' });
    }
    return res.status(200).json({ status: 'success', note });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 'error', message: 'Error retrieving note' });
  }
});

app.get('/notes/:Username/:id', async (req, res) => {
  console.log('GET /notes/:id endpoint reached');
  const noteId = req.params.id;

  if (!ObjectId.isValid(noteId)) {
    return res.status(400).json({ status: 'error', message: 'Invalid note ID' });
  }

  try {
    const note = await Note.findOne({ _id: new ObjectId(noteId) });

    if (!note) {
      return res.status(404).json({ status: 'error', message: 'Note not found' });
    }

    return res.json({ status: 'success', note });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/notes/:username/:id', async (req, res) => {
  console.log('POST /notes/:username/:id endpoint reached');
  const { username, id } = req.params;
  const { Title, Body } = req.body;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ status: 'error', message: 'Invalid note ID' });
  }

  try {
    const note = await Note.findOneAndUpdate(
      { _id: new ObjectId(id), Username: username },
      { Title, Body },
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ status: 'error', message: 'Note not found' });
    }

    return res.json({ status: 'success', message: 'Note updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
});



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