class MotherNode {
  constructor() {
    this.children = [];
  }

  // Setters
  setChildren(children) {
    this.children = children;
  }

  // Getters
  getChildren() {
    return this.children;
  }

  // Add a child to the list
  addChild(child) {
    this.children.push(child);
  }

  // Remove a child from the list
  removeChild(index) {
    this.children.splice(index, 1);
  }

  // Update a child in the list
  updateChild(index, child) {
    this.children[index] = child;
  }

  // Get a child from the list
  getChild(index) {
    return this.children[index];
  }

  // Get the index of a child in the list
  getIndex(child) {
    return this.children.indexOf(child);
  }

  // search child by username
  searchChild(username) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].getUsername() === username) {
        return this.children[i];
      }
    }
    return null;
  }

  // validate give password with master password
  validateMasterPassword(username, password) {
    let child = this.searchChild(username);
    if (child) {
      return child.getMasterPassword() === password;
    }
    return false;
  }
}

module.exports = MotherNode;
