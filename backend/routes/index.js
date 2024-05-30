var express = require("express");
var router = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const MotherNode = require("./MotherNode.js");
const Child = require("./ChildNode.js");
const Password = require("./Password.js");

async function noWayBack(pwd) {
  let result = { salt: "", hash: "" };

  result.salt = await bcrypt.genSalt(saltRounds);

  result.hash = await bcrypt.hash(pwd, result.salt);
  console.log("result: ", result);

  return result;
}

router.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const motherNode = new MotherNode();

function generateAccessToken(payload) {
  return {
    token: jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "900s" }),
  };
}

// Middleware to verify the token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // if token is not there then return 401
  if (token == null) return res.sendStatus(401);

  // otherwise verify the token
  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

var unless = function (middleware, ...paths) {
  return function (req, res, next) {
    const pathCheck = paths.some((path) => path === req.path);
    pathCheck ? next() : middleware(req, res, next);
  };
};

router.use(unless(authenticateToken, "/register", "/login"));

router.get("/ping", (req, res) => {
  res.send(new Date());
});

router.post("/register", (req, res) => {
  const { username, masterPassword } = req.body;

  console.log("username: ", username);
  console.log("masterPassword: ", masterPassword);

  const result = noWayBack(masterPassword).then((result) => {
    return result;
  });

  console.log("result: ", result);

  const child = motherNode.createChild(username, result.hash, result.salt);

  console.log("child: ", child);

  const token = generateAccessToken({
    payload: child.getUsername() + child.getMasterPassword(),
  });

  console.log("token: ", token);

  res.json(token).send("Register Successful");
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
