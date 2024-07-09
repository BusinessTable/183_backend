const {generateUUID} = require("./UUID");

class Password {
    constructor() {
        this.uuid = generateUUID();
        this.data = {};

        // Make primary fields immutable
        Object.freeze(this.uuid);
    }

    setData(data) {
        this.data = data;
    }

    getUUID() {
        return this.uuid;
    }
}

module.exports = Password;
