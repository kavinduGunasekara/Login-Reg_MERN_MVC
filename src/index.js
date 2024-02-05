const express = require("express");
const pasth = require("path");
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();


app.use(express.json());


app.use(express.urlencoded({ extended: false }));


app.set("view engine", "ejs");


app.use(express.static("public"));


app.get("/", (req, res) => {
  
  res.render("login");
});


app.get("/signup", (req, res) => {
  res.render("signup");
});


app.post("/signup", async (req, res) => {
  
  const data = {
    name: req.body.username,
    password: req.body.password,
  };

  
  const existingUser = await collection.findOne({ name: data.name });

  if (existingUser) {
    res.send("User already exists. Please choose a different Username");
  } else {
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);


    data.password = hashedPassword;

    const userData = await collection.insertMany(data);
    console.log(userData);
  }
});


app.post("/login", async (req, res) => {
  try {
    const checkUser = await collection.findOne({ name: req.body.username });

   
    if (!checkUser) {
      return res.send("Invalid Credentials");
    }

    
    const isPassMatch = await bcrypt.compare(
      req.body.password,
      checkUser.password
    );

    if (isPassMatch) {
      
      res.render("home");
    } else {
     
      res.send("Invalid Credentials");
    }
  } catch {
   

    res.send("An error occurred during login. Please try again.");
  }
});


const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
