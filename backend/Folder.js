const mongoose = require("mongoose");

const FolderSchema = new mongoose.Schema(
{
    FolderName: {
        type: String, unique: true
    },
    FolderNotes: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Note"
        }
      ]
}
);

const Folder = mongoose.model("Folder", FolderSchema);
module.exports = Folder;