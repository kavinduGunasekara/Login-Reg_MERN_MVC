const mongoose = require("mongoose");

// Database connection
const connect = mongoose.connect("mongodb+srv://kavindu:0711549169@cluster0.lgjhpqg.mongodb.net/your-database-name?retryWrites=true&w=majority", {

});

// Check if the database is connected or not
connect
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((error) => {
    console.error("Database connection failed!", error);
  });

// Create a schema
const LoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Define the "users" collection
// Collection has 2 parameters: collection name and the schema
const UserModel = mongoose.model("users", LoginSchema);

module.exports = UserModel;
