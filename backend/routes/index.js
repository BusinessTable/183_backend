var express = require("express");
var router = express.Router();
require("dotenv").config();
const dotenv = require("dotenv");
var session = require("express-session");
const jwt = require("jsonwebtoken");
const MotherNode = require("./MotherNode.js");
const Child = require("./ChildNode.js");
const Password = require("./Password.js");

// Add headers before the routes are defined
router.use(function (req, res, next) {
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

function generateAccessToken(payload) {
  return jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "900s" });
}

// Middleware to verify the token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  // check if req accesses register or login

  console.log(req.path);

  if (req.path === "/register" || req.path === "/login") {
    next();
    return;
  }

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

router.use(authenticateToken);

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

  const token = generateAccessToken({
    payload: child.getUsername() + child.getMasterPassword(),
  });
  res.json(token);
});

router.post("/login", (req, res) => {
  const { username, masterPassword } = req.body;
  if (motherNode.validateMasterPassword(username, masterPassword)) {
    const token = generateAccessToken({ payload: username + masterPassword });

    res.json(token).send("Login Successful");
  } else {
    res.sendStatus(400).send("Login Failed");
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
    res.sendStatus(403).send("Child Not Found");
  }
});

router.delete("/passwords", (req, res) => {
  const { username, uuid } = req.body;
  const child = motherNode.searchChild(username);

  if (child) {
    ok = child.removePassword(uuid);
    if (!ok) {
      res.sendStatus(404).send("Password Not Found");
    }
    res.sendStatus(201).send("Password Removed");
  } else {
    res.sendStatus(403).send("Child Not Found");
  }
});

router.put("/passwords", (req, res) => {
  const { username, uuid, newPassword } = req.body;
  const child = motherNode.searchChild(username);

  const newPasswordParsed = new Password();
  newPasswordParsed.setType(newPassword.type);
  newPasswordParsed.setPwd(newPassword.pwd);
  newPasswordParsed.setUrl(newPassword.url);
  newPasswordParsed.setNotes(newPassword.notes);
  newPasswordParsed.setUsername(username);

  if (child) {
    ok = child.updatePassword(uuid, newPasswordParsed);
    if (!ok) {
      res.sendStatus(404).send("Password Not Found");
    }
    res.sendStatus(201).send("Password Updated");
  } else {
    res.sendStatus(403).send("Child Not Found");
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
