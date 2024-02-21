const bcrypt = require("bcrypt");

const criptography = {
    encrypt: async (password) => {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        return [salt, hash];
    },
    compare: async (password, hash) => {
        return await bcrypt.compare(password, hash);
    }
}

module.exports = criptography;