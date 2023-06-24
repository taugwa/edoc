const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    Email: {
      type: String,
      unique: true,
    },
    Username: String,
    Password: String,
    Password_second: String,
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    ],
    folders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Folder",
      },
    ],
  },
  {
    collection: "UserDetails",
  }
);

const UserDetails = mongoose.model("UserDetails", UserDetailsSchema);
module.exports = UserDetails;
