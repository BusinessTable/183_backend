const express = require("express");
const router = express.Router();
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const MotherNode = require("./MotherNode.js");
const Password = require("./Password.js");

async function noWayBack(pwd, salt) {
    salt = salt ? salt : await bcrypt.genSalt(saltRounds);

    return { salt: salt, hash: await bcrypt.hash(pwd, salt) };
}

const motherNode = new MotherNode();

function generateAccessToken(payload) {
    return {
        token: jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "900s"}),
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

// High Order Function to dinamically exclude paths with path array
const unless = function (middleware, ...paths) {
    return function (req, res, next) {
        const pathCheck = paths.some((path) => path === req.path);
        pathCheck ? next() : middleware(req, res, next);
    };
};

router.use(unless(authenticateToken, "/register", "/login", "/ping"));
router.use(unless(checkUserToken, "/register", "/login", "/ping"));

router.get("/ping", (req, res) => {
    res.send(new Date());
});

router.post("/register", async (req, res) => {
    const {username, masterPassword} = req.body;

    const check = motherNode.searchChild(username);

    if (check) {
        res.sendStatus(400);
    }

    await noWayBack(masterPassword, "")
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
    const {username, masterPassword} = req.body;

    const check = motherNode.searchChild(username);

    if (check) {
        res.sendStatus(400);
        return;
    }

    const tmp = motherNode.searchChild(username);
    noWayBack(masterPassword, tmp.getSalt())
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
    const {username, passwords} = req.body;
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
    const {username, uuid} = req.body;
    const child = motherNode.searchChild(username);
    if (child) {
        child.removePassword(uuid);
        res.status(201).send("Password Removed");
    } else {
        res.status(403).send("Child Not Found");
    }
});

router.put("/passwords", (req, res) => {
    const {username, uuid, newPassword} = req.body;
    const child = motherNode.searchChild(username);

    const newPasswordParsed = new Password();
    newPasswordParsed.setData(newPassword);

    if (child) {
        const ok = child.updatePassword(uuid, newPasswordParsed);
        if (!ok) {
            res.status(404).send("Password Not Found");
        }
        res.status(201).send("Password Updated");
    } else {
        res.status(403).send("Child Not Found");
    }
});

router.post("/passwords", (req, res) => {
    const {username, page} = req.body;
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

router.post("/rubriken", (req, res) => {
    const {username} = req.body;

    const child = motherNode.searchChild(username);

    if (child) {
        res.status(200).send(child.getRubriken());
    } else {
        res.status(404).send("Child Not Found");
    }
});

router.post("/rubriken/create", (req, res) => {
    const {username, rubrik} = req.body;

    const child = motherNode.searchChild(username);

    if (child) {
        const result = child.addRubrik(rubrik);
        res.status(201).send(result);
    }
});

router.delete("/rubriken", (req, res) => {
    const {username, uuid} = req.body;
    const child = motherNode.searchChild(username);

    if (child) {
        child.deleteRubrik(uuid);
        res.status(201).send("Rubrik Removed");
    } else {
        res.status(403).send("Child Not Found");
    }
});

router.put("/rubriken", (req, res) => {
    const {username, uuid, newRubrik} = req.body;
    const child = motherNode.searchChild(username);

    if (child) {
        child.updateRubrik(uuid, newRubrik);
        res.status(201).send("Rubrik Updated");
    } else {
        res.status(403).send("Child Not Found");
    }
});

router.post("/rubriken/passwords", (req, res) => {
    const {username, uuid, passwordUUID} = req.body;
    const child = motherNode.searchChild(username);

    if (child) {
        const rubrik = child
            .getRubriken()
            .find((rubrik) => rubrik.getUUID() === uuid);
        if (rubrik) {
            rubrik.addPassword(passwordUUID);
            res.status(200).send(rubrik);
        } else {
            res.status(404).send("Rubrik Not Found");
        }
    }
});

router.delete("/rubriken/passwords", (req, res) => {
    const {username, uuid, passwordUUID} = req.body;
    const child = motherNode.searchChild(username);

    if (child) {
        const rubrik = child
            .getRubriken()
            .find((rubrik) => rubrik.getUUID() === uuid);
        if (rubrik) {
            rubrik.removePassword(passwordUUID);
            res.status(201).send("Password Removed");
        } else {
            res.status(404).send("Rubrik Not Found");
        }
    } else {
        res.status(403).send("Child Not Found");
    }
});

module.exports = router;
