var express = require("express");
var router = express.Router();
var path = require("path");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const MotherNode = require("./MotherNode.js");
const Password = require("./Password.js");

async function noWayBack(pwd, salt) {
  let result = { salt: "", hash: "" };

  if (salt) {
    result.salt = salt;
    result.hash = await bcrypt.hash(pwd, salt);
    return result;
  } else {
    result.salt = await bcrypt.genSalt(saltRounds);
    result.hash = await bcrypt.hash(pwd, result.salt);
    return result;
  }
}

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
  next();
};

// Middleware to verify the token
const checkUserToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const username = req.body.username;

  // check if tkoen is for user
  let child = motherNode.searchChild(username);
  if (child.getToken() !== token) {
    return res.sendStatus(401);
  }

  // if token is not there then return 401
  if (token == null) return res.sendStatus(401);

  next();
};

var unless = function (middleware, ...paths) {
  return function (req, res, next) {
    const pathCheck = paths.some((path) => path === req.path);
    pathCheck ? next() : middleware(req, res, next);
  };
};

router.use(unless(authenticateToken, "/register", "/login"));
router.use(unless(checkUserToken, "/register", "/login"));

router.get("/ping", (req, res) => {
  res.send(new Date());
});

router.post("/register", async (req, res) => {
  const { username, masterPassword } = req.body;

  check = motherNode.searchChild(username);

  if (check) {
    res.sendStatus(400);
  }

  const result = await noWayBack(masterPassword, "")
    .then((result) => {
      const child = motherNode.createChild(username, result.hash, result.salt);

      let expiresIn = new Date();
      expiresIn.setSeconds(expiresIn.getSeconds() + 900);

      const token = {
        token: generateAccessToken({
          payload: child.getUsername() + child.getMasterPassword(),
        }).token,
        expiresIn: expiresIn,
      };

      child.setToken(token.token);

      res.json(token);
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});

router.post("/login", (req, res) => {
  const { username, masterPassword } = req.body;

  check = motherNode.searchChild(username);

  if (check == undefined) {
    res.sendStatus(400);
    return;
  }

  const tmp = motherNode.searchChild(username);

  const result = noWayBack(masterPassword, tmp.getSalt())
    .then((result) => {
      if (motherNode.validateMasterPassword(username, result.hash)) {
        let expiresIn = new Date();
        expiresIn.setSeconds(expiresIn.getSeconds() + 900);

        const token = {
          token: generateAccessToken({
            payload: username + masterPassword,
          }).token,
          expiresIn: expiresIn,
        };

        tmp.setToken(token.token);

        res.json(token);
      } else {
        res.status(400).send("Login Failed");
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
});

router.post("/passwords/add", (req, res) => {
  const { username, passwords } = req.body;
  const child = motherNode.searchChild(username);

  if (!child) {
    res.status(403).send("Child Not Found");
  }

  const pwd = new Password();
  pwd.setData(passwords);

  child.addPassword(pwd);

  res.status(201).send("Password Added");
});

router.delete("/passwords", (req, res) => {
  const { username, uuid } = req.body;
  const child = motherNode.searchChild(username);

  if (child) {
    ok = child.removePassword(uuid);
    if (!ok) {
      res.status(404).send("Password Not Found");
    }
    res.status(201).send("Password Removed");
  } else {
    res.status(403).send("Child Not Found");
  }
});

router.put("/passwords", (req, res) => {
  const { username, uuid, newPassword } = req.body;
  const child = motherNode.searchChild(username);

  const newPasswordParsed = new Password();
  newPasswordParsed.setData(newPassword);

  if (child) {
    ok = child.updatePassword(uuid, newPasswordParsed);
    if (!ok) {
      res.status(404).send("Password Not Found");
    }
    res.status(201).send("Password Updated");
  } else {
    res.status(403).send("Child Not Found");
  }
});

router.post("/passwords", (req, res) => {
  const { username, page } = req.body;
  const child = motherNode.searchChild(username);
  if (child) {
    if (page) {
      const pageInformation = {
        totalPages: Math.ceil(child.getPasswords().length / 10),
        passwords: child.getPasswordsPaged(page),
      };
      res.status(200).send(pageInformation);
    } else {
      res.status(200).send(child.getPasswords());
    }
  } else {
    res.send("Child Not Found");
  }
});

module.exports = router;
