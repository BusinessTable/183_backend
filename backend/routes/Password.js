class Password {
  constructor(type, username, pwd, url, notes) {
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
}

module.exports = Password;
