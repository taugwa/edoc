const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
    {
        Title: String, 
        Body: String,
    },
    {
      collection: "notes",
  }
);
mongoose.model("Note", NotesSchema);
module.exports = mongoose.model("Note", NotesSchema);