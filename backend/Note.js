const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
    {
        Title: String, 
        Body: String,
    },
    {
      collection: "notes",
      timestamps: true
  }
);
mongoose.model("Note", NotesSchema);
module.exports = mongoose.model("Note", NotesSchema);