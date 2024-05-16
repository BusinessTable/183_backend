class Password {
  constructor(type, username, pwd, url, notes) {
    this.type = "";
    this.username = "";
    this.pwd = "";
    this.url = "";
    this.notes = "";
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
