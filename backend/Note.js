const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema(
    {
        Title: String, 
        Body: String,
    },
    
);
mongoose.model("Note", NotesSchema);
module.exports = mongoose.model("Note", NotesSchema);