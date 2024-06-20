class ChildNode {
  constructor(username, masterpassword, salt) {
    this.token = "";
    this.username = username;
    this.masterpassword = masterpassword;
    this.salt = salt;
    this.recoveryWords = [];
    this.passwords = [];

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
