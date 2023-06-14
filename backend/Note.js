const mongoose = require('mongoose');

const NotesSchema = new mongoose.Schema({
  
  Title: String,
  Body: String,
  
});

module.exports = mongoose.model('Note', NotesSchema);
