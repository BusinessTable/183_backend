var express = require("express");
var router = express.Router();
require("dotenv").config();
var session = require("express-session");
const MotherNode = require("./MotherNode.js");
const Child = require("./ChildNode.js");
const Password = require("./Password.js");

// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

const motherNode = new MotherNode();

// Middleware to authorize the user via masterpassword
// const authorize = (req, res, next) => {
//   const { username, masterPassword } = req.body;
//   if (motherNode.validateMasterPassword(username, masterPassword)) {
//     next();
//   } else {
//     res.send("Unauthorized");
//   }
// };

// router.use(authorize);

router.get("/ping", (req, res) => {
  res.send(new Date());
});

router.post("/register", (req, res) => {
  const { username, masterPassword } = req.body;
  const child = new Child(username, masterPassword);
  motherNode.addChild(child);
  res.send(child);
});

router.post("/login", (req, res) => {
  const { username, masterPassword } = req.body;
  if (motherNode.validateMasterPassword(username, masterPassword)) {
    res.send("Login Successful");
  } else {
    res.send("Login Failed");
  }
});

router.post("/passwords", (req, res) => {
  const { username, password } = req.body;

  const pwd = new Password();
  pwd.setType(password.type);
  pwd.setPwd(password.pwd);
  pwd.setUrl(password.url);
  pwd.setNotes(password.notes);
  pwd.setUsername(username);

  const child = motherNode.searchChild(username);
  if (child) {
    child.addPassword(pwd);
    res.send("Password Added");
  } else {
    res.send("Child Not Found");
  }
});

router.delete("/passwords", (req, res) => {
  const { username, password } = req.body;
  const child = motherNode.searchChild(username);

  const pwd = new Password();
  pwd.setType(password.type);
  pwd.setPwd(password.pwd);
  pwd.setUrl(password.url);
  pwd.setNotes(password.notes);
  pwd.setUsername(username);

  if (child) {
    child.removePassword(child.findPassword(password));
    res.send("Password Removed");
  } else {
    res.send("Child Not Found");
  }
});

router.put("/passwords", (req, res) => {
  const { username, password, newPassword } = req.body;
  const child = motherNode.searchChild(username);

  const newPasswordParsed = new Password();
  newPasswordParsed.setType(newPassword.type);
  newPasswordParsed.setPwd(newPassword.pwd);
  newPasswordParsed.setUrl(newPassword.url);
  newPasswordParsed.setNotes(newPassword.notes);
  newPasswordParsed.setUsername(username);

  const passwordParsed = new Password();
  passwordParsed.setType(password.type);
  passwordParsed.setPwd(password.pwd);
  passwordParsed.setUrl(password.url);
  passwordParsed.setNotes(password.notes);
  passwordParsed.setUsername(username);

  if (child) {
    child.updatePassword(passwordParsed, newPasswordParsed);
    res.send("Password Updated");
  } else {
    res.send("Child Not Found");
  }
});

router.get("/passwords", (req, res) => {
  const { username } = req.body;
  const child = motherNode.searchChild(username);
  if (child) {
    res.send(child.getPasswords());
  } else {
    res.send("Child Not Found");
  }
});

module.exports = router;
