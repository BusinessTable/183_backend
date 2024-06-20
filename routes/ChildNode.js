class ChildNode {
  constructor(username, masterpassword, salt) {
    this.token = "";
    this.username = username;
    this.masterpassword = masterpassword;
    this.salt = salt;
    this.recoveryWords = [];
    this.passwords = [];
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

  // find password by uuid
  findPassword(password) {
    for (let i = 0; i < this.passwords.length; i++) {
      if (this.passwords[i].getUUID() === password.getUUID()) {
        return this.passwords[i];
      }
    }
    return null;
  }

  // Add a password to the list
  addPassword(password) {
    this.passwords.push(password);
  }

  // Remove a password from the list
  removePassword(uuid) {
    for (let i = 0; i < this.passwords.length; i++) {
      if (this.passwords[i].getUUID() === uuid) {
        this.passwords.splice(i, 1);
        return true;
      }
    }
  }

  // Update a password in the list
  updatePassword(uuid, newPassword) {
    for (let i = 0; i < this.passwords.length; i++) {
      if (this.passwords[i].getUUID() === uuid) {
        this.passwords[i] = newPassword;
        return true;
      }
    }
  }
}

module.exports = ChildNode;
