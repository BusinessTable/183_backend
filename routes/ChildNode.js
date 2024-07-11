const Rubrik = require("./Rubrik");

class ChildNode {
    constructor(username, masterpassword, salt) {
        this.token = "";
        this.username = username;
        this.masterpassword = masterpassword;
        this.salt = salt;
        this.passwords = [];
        this.rubriken = [];

        // make primary fields immutable
        Object.freeze(this.username);
        Object.freeze(this.masterpassword);
        Object.freeze(this.salt);
    }

    // Setters
    setToken(token) {
        this.token = token;
    }

    getUsername() {
        return this.username;
    }

    getMasterPassword() {
        return this.masterpassword;
    }

    getPasswords() {
        return this.passwords;
    }

    getPasswordsPaged(page) {
        return this.passwords.slice(page * 10 - 10, (page + 1) * 10 - 10);
    }

    getSalt() {
        return this.salt;
    }

    getToken() {
        return this.token;
    }

    getRubriken() {
        return this.rubriken;
    }

    deleteRubrik(uuid) {
        this.rubriken = this.rubriken.filter((rubrik) => rubrik.getUUID() !== uuid);
    }

    addRubrik(newRubrik) {
        const rubrik = new Rubrik();
        rubrik.setName(newRubrik.name);

        this.rubriken.push(rubrik);
        return rubrik;
    }

    updateRubrik(uuid, newRubrik) {
        this.rubriken.forEach((rubrik) => {
            if (rubrik.getUUID() === uuid) {
                rubrik.setName(newRubrik.name);
            }
        });
    }

    // Add a password to the list
    addPassword(password) {
        this.passwords.push(password);
    }

    // Remove a password from the list
    removePassword(uuid) {
        this.passwords = this.passwords.filter(
            (password) => password.getUUID() !== uuid
        );
    }

    // Update a password in the list
    updatePassword(uuid, newPassword) {
        return this.passwords = this.passwords.map((password) => {
            if (password.getUUID() === uuid) {
                return newPassword;
            }
            return password;
        });
    }
}

module.exports = ChildNode;
