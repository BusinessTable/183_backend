const Rubrik = require("./Rubrik");

class ChildNode {
  constructor(username, masterpassword, salt) {
    this.token = "";
    this.username = username;
    this.masterpassword = masterpassword;
    this.salt = salt;
    this.recoveryWords = [];
    this.passwords = [];
    this.rubriken = [];

    // make primary fields immutable
    Object.freeze(this.username);
    Object.freeze(this.masterpassword);
    Object.freeze(this.salt);
  }

  // Setters
  setUsername(username) {
    this.username = username;
  }

  setMasterPassword(masterpassword) {
    this.masterpassword = masterpassword;
  }

  setRecoveryWords(recoveryWords) {
    this.recoveryWords = recoveryWords;
  }

  setPasswords(passwords) {
    this.passwords = passwords;
  }

  setSalt(salt) {
    this.salt = salt;
  }

  setToken(token) {
    this.token = token;
  }

  setRubriken(rubriken) {
    this.rubriken = rubriken;
  }

  // Getters

  getUsername() {
    return this.username;
  }

  getMasterPassword() {
    return this.masterpassword;
  }

  getRecoveryWords() {
    return this.recoveryWords;
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
    rubrik.setName(rubrik.name);

    this.rubriken.push(rubrik);
    return rubrik;
  }

  updateRubrik(uuid, newRubrik) {
    this.rubriken = this.rubriken.map((rubrik) => {
      if (rubrik.getUUID() === uuid) {
        return newRubrik;
      }
      return rubrik;
    });
  }

  // find password by uuid
  findPassword(password) {
    this.passwords.forEach((element) => {
      if (element.getUUID() === password.getUUID()) {
        return element;
      }
    });
    return null;
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
    this.passwords = this.passwords.map((password) => {
      if (password.getUUID() === uuid) {
        return newPassword;
      }
      return password;
    });
  }
}

module.exports = ChildNode;
