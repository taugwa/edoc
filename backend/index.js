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
require("./Folder");
const { ObjectId } = require('mongodb');
const UserDetails = require("./UserDetails");
const Note = mongoose.model("Note");
const User = mongoose.model("UserDetails");
const Folder =mongoose.model("Folder");
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
 //  console.log("get notes username");
  // console.log(Username);
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

app.get('/notes/:Username/:NoteId', async (req, res) => {
 // console.log('GET /notes/:Username/:NoteId endpoint reached');
  const { Username, NoteId } = req.params;
  // console.log('Received Username:', Username);
  // console.log('Received NoteId:', NoteId);

  try {
    // Fetch the note from the database
    const note = await Note.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(NoteId) });
    if (!note) {
      return res.status(404).json({ status: 'error', message: 'Note not found' });
    }

    return res.json({ status: 'success', note });
  } catch (error) {
    console.error(error);
  //  console.log("hi theres an error");
    return res.status(500).json({ status: 'error', message: error.message });
  }
});

app.post('/notes/:Username/:NoteId', async (req, res) => {
 // console.log('POST /notes/:Username/:NoteId endpoint reached');
  const { Username, NoteId } = req.params;
  const { Title, Body } = req.body;
 // console.log('Received username:', Username);
  //console.log('Received noteId:', NoteId);

  try {
    // Find the user document and populate the notes field
   // console.log('Received username:', Username);
    const user = await UserDetails.findOne({ Username }).populate('notes');

    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    // Find the note by its _id in the notes array
    const note = user.notes.find((note) => note._id.toString() === NoteId);
  //  console.log('User notes:', user.notes);
   // console.log('User notes:', note);

    if (!note) {
      // Create a new note object
      const newNote = new Note({
        _id: NoteId,
        Title,
        Body,
      });
       
      // Add the new note to the notes array
      user.notes.push(newNote);
    } else {
      // Update the existing note
      note.Title = Title;
      note.Body = Body;
    }

    // Save the updated user document
    await note.save();
   // console.log("trying"+ Title);
    //console.log("trying body" + Body);

    return res.json({ status: 'success', message: 'Note saved successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: 'error', message: error.message });
  }
});


app.post('/folders/:Username', async (req, res) => {
  console.log('Folder POST route reached');

  const { Username } = req.params;
  const { Title, notes } = req.body;
  try {
    const user = await User.findOne({ Username });
    if (!user) {
      return res.status(404).json({ status: 'error', message: 'User not found' });
    }

    const folder = new Folder({
      Title,
      notes,
    });

    await folder.save();
    user.folders.push(folder._id);
    await user.save();

    // Send the generated folderId in the response
    res.status(201).json({ status: 'success', message: 'Folder created', folderId: folder._id });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/folders/:Username', async (req, res) => {
  try {
   // console.log("GET folders username");
    const { Username } = req.params;

    // Retrieve the folder data from the database or any other data source
    const folders = await Folder.find({ username: Username });

    // Return the folder data as a response
    res.json(folders);
  } catch (error) {
    // Handle any potential errors and return an error response
    res.status(500).json({ error: 'Internal server error' });
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