const {generateUUID} = require("./UUID");

class Rubrik {
    constructor(name) {
        this.name = name;
        this.passwords = [];
        this.uuid = generateUUID();

        Object.freeze(this.uuid);
    }

    getUUID() {
        return this.uuid;
    }

    setName(name) {
        this.name = name;
    }

    getPasswords() {
        return this.passwords;
    }

    getPasswordsPaged(page) {
        return this.passwords.slice(page * 10 - 10, (page + 1) * 10 - 10);
    }

    // Add a password to the list
    addPassword(password) {
        this.passwords.push(password);
    }

    // Remove a password from the list
    removePassword(uuid) {
        this.passwords = this.passwords.filter(
            (password) => password !== uuid
        );
    }
}

module.exports = Rubrik;
