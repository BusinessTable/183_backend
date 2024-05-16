var express = require("express");
var router = express.Router();
require("dotenv").config();
var session = require("express-session");
const MotherNode = require("./MotherNode.js");

const motherNode = new MotherNode();

// Middleware to authorize the user via masterpassword
const authorize = (req, res, next) => {
  const { username, masterPassword } = req.body;
  if (motherNode.validateMasterPassword(username, masterPassword)) {
    next();
  } else {
    res.send("Unauthorized");
  }
};

router.use(authorize);

router.get("/ping", (req, res) => {
  res.send(new Date());
});

router.post("/register", (req, res) => {
  const { username, masterPassword } = req.body;
  const child = new Child(username, masterPassword);
  motherNode.addChild(child);
  res.send("Registered");
});

router.post("/login", (req, res) => {
  const { username, masterPassword } = req.body;
  if (motherNode.validateMasterPassword(username, masterPassword)) {
    res.send("Login Successful");
  } else {
    res.send("Login Failed");
  }
});

router.post("/addPassword", (req, res) => {
  const { username, password } = req.body;

  const child = motherNode.searchChild(username);
  if (child) {
    child.addPassword(password);
    res.send("Password Added");
  } else {
    res.send("Child Not Found");
  }
});

router.post("/removePassword", (req, res) => {
  const { username, index } = req.body;
  const child = motherNode.searchChild(username);
  if (child) {
    child.removePassword(index);
    res.send("Password Removed");
  } else {
    res.send("Child Not Found");
  }
});

router.post("/updatePassword", (req, res) => {
  const { username, index, password } = req.body;
  const child = motherNode.searchChild(username);
  if (child) {
    child.updatePassword(index, password);
    res.send("Password Updated");
  } else {
    res.send("Child Not Found");
  }
});

router.get("/getPasswords", (req, res) => {
  const { username } = req.body;
  const child = motherNode.searchChild(username);
  if (child) {
    res.send(child.getPasswords());
  } else {
    res.send("Child Not Found");
  }
});

module.exports = router;
