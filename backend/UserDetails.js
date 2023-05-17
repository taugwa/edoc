const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
{
    Email: {
        type: String, unique: true
    },
    Username: String,
    Password: String,
    Password_second: String,
},
{
    collection: "UserDetails",
}
);
mongoose.model("UserDetails", UserDetailsSchema);