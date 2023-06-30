const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema({
  title: String,
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
});

const Folder = mongoose.model("Folder", FolderSchema);
module.exports = Folder;