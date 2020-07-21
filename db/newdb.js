const util = require("util");
const fs = require("fs");

const readFile = util.promisify(fs.readFile)

class NewDB {
    read(){
        return readFile("db/db.json", "utf8")
    }
}

module.exports = new NewDB();