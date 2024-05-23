class Password {
  constructor(type, username, pwd, url, notes) {
    this.uuid = this.generateUUID();
    this.type = type;
    this.username = username;
    this.pwd = pwd;
    this.url = url;
    this.notes = notes;
  }

  // Setters
  setType(type) {
    this.type = type;
  }
  setUsername(username) {
    this.username = username;
  }
  setPwd(pwd) {
    this.pwd = pwd;
  }
  setUrl(url) {
    this.url = url;
  }
  setNotes(notes) {
    this.notes = notes;
  }

  setUUID(uuid) {
    this.uuid = uuid;
  }

  // Getters
  getType() {
    return this.type;
  }
  getUsername() {
    return this.username;
  }
  getPwd() {
    return this.pwd;
  }
  getUrl() {
    return this.url;
  }
  getNotes() {
    return this.notes;
  }

  getUUID() {
    return this.uuid;
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

module.exports = Password;
