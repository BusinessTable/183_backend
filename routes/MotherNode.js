const Child = require("./ChildNode.js");

class MotherNode {
    constructor() {
        this.children = [];
    }

// Add a child to the list
    addChild(child) {
        this.children.push(child);
    }

// search child by username
    searchChild(username) {
        let child = null;

        this.children.forEach((element) => {
            if (element.getUsername() === username) {
                child = element;
            }
        });
        return child;
    }

    // validate give password with master password
    validateMasterPassword(username, password) {
        let child = this.searchChild(username);
        if (child) {
            return child.getMasterPassword() === password;
        }
        return false;
    }

    // Create new Child
    createChild(username, masterPassword, salt) {
        const child = new Child(username, masterPassword, salt);
        this.addChild(child);
        return child;
    }
}

module.exports = MotherNode;
