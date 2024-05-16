class ChildNode {
  constructor() {
    this.username = "";
    this.masterpassword = "";
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

  // Add a password to the list
  addPassword(password) {
    this.passwords.push(password);
  }

  // Remove a password from the list
  removePassword(index) {
    this.passwords.splice(index, 1);
  }

  // Update a password in the list
  updatePassword(index, password) {
    this.passwords[index] = password;
  }
}

module.exports = ChildNode;
