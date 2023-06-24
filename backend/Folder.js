const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema(
  {
    Title: String,
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
  },
  {
    collection: "folders",
  }
);

mongoose.model("Folder", FolderSchema);
module.exports = mongoose.model("Folder", FolderSchema);
