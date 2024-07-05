class Rubrik {
  constructor(name) {
    this.name = name;
    this.password = [];
    this.uuid = this.generateUUID();
  }

  getName() {
    return this.name;
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

  generateUUID() {
    // Public Domain/MIT
    var d = new Date().getTime(); //Timestamp
    var d2 =
      (typeof performance !== "undefined" &&
        performance.now &&
        performance.now() * 1000) ||
      0; //Time in microseconds since page-load or 0 if unsupported
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = Math.random() * 16; //random number between 0 and 16
        if (d > 0) {
          //Use timestamp until depleted
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          //Use microseconds since page-load if supported
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
  }
}

module.exports = Rubrik;
