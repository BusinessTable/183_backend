class ChildNode {
  constructor(username, masterpassword) {
    this.username = username;
    this.masterpassword = masterpassword;
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

  // find password by username and url
  findPassword(password) {
    for (let i = 0; i < this.passwords.length; i++) {
      if (this.passwords[i] === password) {
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
  removePassword(password) {
    let index = this.passwords.indexOf(password);
    this.passwords.splice(index, 1);
  }

  // Update a password in the list
  updatePassword(password, newPassword) {
    let index = this.passwords.indexOf(password);
    this.passwords[index] = newPassword;
  }
}

module.exports = ChildNode;
